import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Offer } from '@app/models/offer.model';
import { OffersService } from '@app/services/offers.service';
import { OFFERS } from '@app/testing/models/offer.mock';
import { dispatchEvent } from '@testing/common';
import { Detail4Component } from '../detail4/detail4.component';
import { Overview4Component } from './overview4.component';

describe('Overview4Component', () => {

  let fixture: ComponentFixture<Overview4Component>;
  let router: Router;
  let component: Overview4Component;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: Overview4Component,
            children: [
              {
                path: ':offerId',
                component: Detail4Component,
              },
            ],
          },
        ]),
        FormsModule,
      ],
      declarations: [
        Overview4Component,
        Detail4Component,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(Overview4Component);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('Should highlight an Offer on select', async () => {
    spyOn(router, 'navigate');

    await fixture.whenStable();

    const offerElements: NodeListOf<HTMLTableDataCellElement> = element.querySelectorAll(`td[scope='row']`);
    // The currently actived route
    const route = router.routerState.root;

    await dispatchEvent(offerElements[1], 'click', fixture);

    expect(offerElements[1].className).toContain('table-info');
    expect(router.navigate).toHaveBeenCalledWith([OFFERS[1].id], { relativeTo: route });
  });

  it('Should update the selected Offer on external navigations', async () => {
    await fixture.whenStable();

    const offerElements: NodeListOf<HTMLTableDataCellElement> = element.querySelectorAll(`td[scope='row']`);
    const route = router.routerState.root;

    await dispatchEvent(offerElements[1], 'click', fixture);

    expect(offerElements[1].className).toContain('table-info');

    await router.navigate([10_007], { relativeTo: route });

    fixture.detectChanges();
    await fixture.whenStable();

    expect(offerElements[1].className).not.toContain('table-info');
    expect(offerElements[6].className).toContain('table-info');
  });

  it('Should not select an Offer when random text is inserted in the URL', async () => {
    await fixture.whenStable();

    const route = router.routerState.root;

    await router.navigate(['random-text'], { relativeTo: route });

    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelectorAll('table-info').length).toBe(0);
  });

  it('Should not select an Offer when the Offer is not found base on the ID in the URL', async () => {
    await fixture.whenStable();

    const route = router.routerState.root;

    await router.navigate([10_010], { relativeTo: route });

    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelectorAll('table-info').length).toBe(0);
  });

  it('Should add a new random Offer to the list', inject([OffersService],  async (offersService: OffersService) => {
    await fixture.whenStable();

    const addOfferBtn: HTMLButtonElement | null = element.querySelector('button.btn-primary');
    const route = router.routerState.root;

    spyOn(router, 'navigate');
    spyOn(offersService, 'save').and.callFake((offer: Offer) => {
      expect(offer.id).toBe(10_009);

      offersService.findAll().push(offer);

      return null;
    });

    addOfferBtn!.click();
    fixture.detectChanges();

    await fixture.whenStable();

    const offerElements: NodeListOf<HTMLTableDataCellElement> = element.querySelectorAll(`td[scope='row']`);

    expect(offerElements.length).toBe(component.offers.length);
    expect(router.navigate).toHaveBeenCalledWith([10_009], { relativeTo: route });
  }));

  it('Should not highlight an already selected Offer again', async () => {
    await fixture.whenStable();

    const offerElements: NodeListOf<HTMLTableDataCellElement> = element.querySelectorAll(`td[scope='row']`);
    spyOn(router, 'navigate');

    await dispatchEvent(offerElements[1], 'click', fixture);

    expect(offerElements[1].className).toContain('table-info');

    await dispatchEvent(offerElements[1], 'click', fixture);

    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

  // UNIT TESTS COPIED FROM OVERVIEW 3 COMPONENT, BECAUSE THE BEHAVIOR IS IDENTICAL

  it('Should render all Offers in the table', async () => {
    await fixture.whenStable();

    const offerElements: NodeListOf<HTMLTableDataCellElement> = element.querySelectorAll(`td[scope='row']`);

    expect(offerElements.length).toBe(component.offers.length);
  });
});
