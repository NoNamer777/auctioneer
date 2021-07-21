import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { OffersService } from '@services/offers.service';
import { Detail3Component } from '@components/offers/detail3/detail3.component';
import { Overview3Component } from '@components/offers/overview3/overview3.component';
import { dispatchEvent } from '@testing/common';
import { OFFERS } from '@testing/models/offer.mock';
import * as common from '@models/common';
import { Offer } from '@models/offer.model';

describe('Overview3Component', () => {

  let fixture: ComponentFixture<Overview3Component>;
  let component: Overview3Component;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        Overview3Component,
        Detail3Component,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    spyOn(common, 'generateRandomOffers').and.returnValue(Object.assign([], OFFERS));

    fixture = TestBed.createComponent(Overview3Component);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('Should render all Offers in the table', async () => {
    await fixture.whenStable();

    const offerElements: NodeListOf<HTMLTableDataCellElement> = element.querySelectorAll(`td[scope='row']`);

    expect(offerElements.length).toBe(component.offers.length);
  });

  it('Should highlight an Offer on select', async () => {
    await fixture.whenStable();

    const offerElements: NodeListOf<HTMLTableDataCellElement> = element.querySelectorAll(`td[scope='row']`);

    await dispatchEvent(offerElements[1], 'click', fixture);

    expect(offerElements[1].className).toContain('table-info');
  });

  it('Should not highlight an already selected Offer again', async () => {
    await fixture.whenStable();

    const offerElements: NodeListOf<HTMLTableDataCellElement> = element.querySelectorAll(`td[scope='row']`);
    const detail3Component: Detail3Component = fixture.debugElement.query(By.directive(Detail3Component)).componentInstance;

    spyOn(detail3Component.editedOfferIdChange, 'emit');

    await dispatchEvent(offerElements[1], 'click', fixture);

    expect(offerElements[1].className).toContain('table-info');

    await dispatchEvent(offerElements[1], 'click', fixture);

    expect(detail3Component.editedOfferIdChange.emit).toHaveBeenCalledTimes(1);
  });

  it('Should add a new random Offer to the list', inject([OffersService],  async (offersService: OffersService) => {
    await fixture.whenStable();

    const addOfferBtn: HTMLButtonElement | null = element.querySelector('button.btn-primary');

    spyOn(offersService, 'save').and.callFake((offer: Offer) => {
      expect(offer.id).toBe(10_003);

      offersService.findAll().push(offer);

      return null;
    });

    addOfferBtn!.click();
    fixture.detectChanges();

    await fixture.whenStable();

    const offerElements: NodeListOf<HTMLTableDataCellElement> = element.querySelectorAll(`td[scope='row']`);
    const selectedOfferElement: HTMLTableDataCellElement | null = element.querySelector('td.table-info');
    const selectedOffer = component.offers[component.offers.length - 1];

    expect(offerElements.length).toBe(component.offers.length);
    expect(selectedOfferElement!.innerText).toBe(selectedOffer.title);
  }));
});
