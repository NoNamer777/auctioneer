import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { OffersService } from '@app/services/offers.service';
import { Detail4Component } from '@components/offers/detail4/detail4.component';
import { Offer } from '@models/offer.model';
import * as common from '@models/common';
import { dispatchEvent } from '@testing/common';
import { OFFERS } from '@testing/models/offer.mock';

describe('Detail4Component', () => {

  let fixture: ComponentFixture<Detail4MockComponent>;
  let offersService: OffersService;
  let router: Router;
  let component: Detail4Component;
  let element: HTMLElement;

  @Component({
    selector: 'auc-detail4-mock',
    template: `
      <div>
        <router-outlet></router-outlet>
      </div>
    `,
  })
  class Detail4MockComponent {}

  async function initializeComponentElements(offerId: number): Promise<void> {
    await router.navigate([offerId]);

    fixture.detectChanges();
    await fixture.whenStable();

    component = fixture.debugElement.query(By.directive(Detail4Component)).componentInstance;
    element = fixture.debugElement.query(By.directive(Detail4Component)).nativeElement;

    component.ngOnInit();

    fixture.detectChanges();
    return fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: Detail4MockComponent,
            children: [
              {
                path: ':offerId',
                component: Detail4Component,
              }
            ],
          },
          {
            path: 'offer/overview4',
            redirectTo: '',
          }
        ]),
      ],
      declarations: [
        Detail4Component,
        Detail4MockComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    spyOn(common, 'generateRandomOffers').and.returnValue(Object.assign([], OFFERS));

    offersService = TestBed.inject(OffersService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(Detail4MockComponent);
  });

  it('Should render the Offer with the ID passed from the URL', async () => {
    const spy = spyOn(offersService, 'findById');

    spy.and.returnValue(OFFERS[0]);

    await initializeComponentElements(OFFERS[0].id);

    expect(component.offer).not.toBeNull();
    expect(offersService.findById).toHaveBeenCalledWith(OFFERS[0].id);
    expect(element.querySelector(`th[scope='col']`)!.textContent).toContain(OFFERS[0].id);

    spy.and.returnValue(OFFERS[1]);

    await router.navigate([OFFERS[1].id]);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelector(`th[scope='col']`)!.textContent).toContain(OFFERS[1].id);
  });

  it('Should hide the component when Offer Id is removed from the URL', async () => {
    await initializeComponentElements(OFFERS[0].id);

    expect(element.querySelector(`th[scope='col']`)!.textContent).toContain(OFFERS[0].id);

    await router.navigate(['']);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.querySelector('auc-detail4')).toBeNull();
  });

  it('Should navigate back when the Offer was deleted', async () => {
    await initializeComponentElements(OFFERS[0].id);

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(router, 'navigate');

    (element.querySelector('button.btn-danger') as HTMLButtonElement).click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(offersService.findById(OFFERS[0].id)).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/offers/overview4']);
  });

  it('Should navigate back when editing an Offer was canceled', async () => {
    await initializeComponentElements(OFFERS[0].id);

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(router, 'navigate');

    (element.querySelector('button.btn-primary') as HTMLButtonElement).click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.navigate).toHaveBeenCalledWith(['/offers/overview4']);
  });

  // UNIT TESTS COPIED FROM DETAIL 3 COMPONENT, BECAUSE THE BEHAVIOR IS IDENTICAL

  it('Should not delete an Offer when the action was not confirmed', async () => {
    await initializeComponentElements(OFFERS[0].id);

    const deleteBtn: HTMLButtonElement | null = element.querySelector('button.btn-danger');
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(offersService, 'deletebyId');

    deleteBtn!.click();
    fixture.detectChanges();

    await fixture.whenStable();

    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(offersService.deletebyId).not.toHaveBeenCalled();
    expect(element.querySelector('table')).not.toBeNull();
  });

  it('Should empty the form and keep the Offer ID when the form is cleared', async () => {
    await initializeComponentElements(OFFERS[0].id);

    const clearBtn: HTMLButtonElement | null = element.querySelector('button.btn-warning');

    clearBtn!.click();
    fixture.detectChanges();

    await fixture.whenStable();

    const tableHeader: HTMLTableHeaderCellElement | null = element.querySelector('tr.table-primary th');
    const titleInput: HTMLInputElement | null = element.querySelector(`input[name='title']`);

    expect(titleInput!.value).toBe('');
    expect(tableHeader!.textContent).toContain(OFFERS[0].id);
    expect(component.offer).not.toEqual(OFFERS[0]);
  });

  it('Should reset made changes to original state on reset button click', async () => {
    await initializeComponentElements(OFFERS[0].id);

    const resetBtn: HTMLButtonElement | null = element.querySelector('button.btn-secondary');
    const titleInput: HTMLInputElement | null = element.querySelector(`input[name='title']`);
    spyOn(window, 'confirm').and.returnValue(true);

    titleInput!.value = 'Awesome title 2';
    dispatchEvent(titleInput!, 'input', fixture);

    expect(resetBtn!.disabled).toBeFalse();

    resetBtn!.click();
    fixture.detectChanges();

    await fixture.whenStable();

    expect(titleInput!.value).toBe(OFFERS[0].title);
    expect(resetBtn!.disabled).toBeTrue();
  });

  it('Should save changes when the save button is pressed', async () => {
    await initializeComponentElements(OFFERS[0].id);

    const saveBtn: HTMLButtonElement | null = element.querySelector('button.btn-success');
    const titleInput: HTMLInputElement | null = element.querySelector(`input[name='title']`);
    const newTitle = 'Awesome title 2';
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(offersService, 'save').and.callFake((offer: Offer) => {
      expect(offer.id).toBe(component.offer!.id);
      expect(offer.title).toBe(newTitle);

      return OFFERS[0];
    });

    titleInput!.value = newTitle;
    dispatchEvent(titleInput!, 'input', fixture);

    expect(saveBtn!.disabled).toBeFalse();

    saveBtn!.click();
    fixture.detectChanges();

    await fixture.whenStable();

    expect(saveBtn!.disabled).toBeFalse();
    expect(offersService.save).toHaveBeenCalled();
  });

  it('Should prompt for unsaved changes when resetting, clearing, canceling while editing an Offer', async () => {
    spyOn(window, 'confirm').and.returnValue(false);

    await initializeComponentElements(OFFERS[0].id);

    const titleInput: HTMLInputElement | null = element.querySelector(`input[name='title']`);
    let { resetBtn, clearBtn, cancelBtn } = {
      resetBtn: element.querySelector('button.btn-secondary') as HTMLButtonElement,
      clearBtn: element.querySelector('button.btn-warning') as HTMLButtonElement,
      cancelBtn: element.querySelector('button.btn-primary') as HTMLButtonElement,
    };

    titleInput!.value = 'Awesome title 1';

    await dispatchEvent(titleInput!, 'input', fixture);

    resetBtn = element.querySelector('button.btn-secondary') as HTMLButtonElement;
    clearBtn = element.querySelector('button.btn-warning') as HTMLButtonElement;
    cancelBtn = element.querySelector('button.btn-primary') as HTMLButtonElement;

    expect(resetBtn!.disabled).toBeFalse();
    expect(clearBtn!.disabled).toBeFalse();
    expect(cancelBtn!.disabled).toBeFalse();

    resetBtn!.click();
    fixture.detectChanges();

    expect(window.confirm).toHaveBeenCalledTimes(1);

    clearBtn!.click();
    fixture.detectChanges();

    expect(window.confirm).toHaveBeenCalledTimes(2);

    cancelBtn!.click();
    fixture.detectChanges();

    expect(window.confirm).toHaveBeenCalledTimes(3);
  });
});
