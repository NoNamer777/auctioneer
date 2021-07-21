import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { OffersService } from '@services/offers.service';
import { Detail3Component } from '@components/offers/detail3/detail3.component';
import * as common from '@models/common';
import { Offer } from '@models/offer.model';
import { dispatchEvent } from '@testing/common';
import { OFFERS } from '@testing/models/offer.mock';


describe('Detail3Component', () => {

  let fixture: ComponentFixture<Overview3MockComponent>;

  let offersService: OffersService;

  let component: Detail3Component;
  let element: HTMLElement;

  @Component({
    selector: 'auc-overview3-mock',
    template: `
      <div>
        <auc-detail3 [(editedOfferId)]="selectedOfferId"></auc-detail3>
      </div>
    `,
  })
  class Overview3MockComponent {

    selectedOfferId: number | null = OFFERS[0].id;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
      ],
      declarations: [
        Detail3Component,
        Overview3MockComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    spyOn(common, 'generateRandomOffers').and.returnValue(Object.assign([], OFFERS));

    offersService = TestBed.inject(OffersService);

    fixture = TestBed.createComponent(Overview3MockComponent);

    component = fixture.debugElement.query(By.directive(Detail3Component)).componentInstance;
    element = fixture.debugElement.query(By.directive(Detail3Component)).nativeElement;

    spyOn(component.editedOfferIdChange, 'emit');

    fixture.detectChanges();
  });

  it('Should render the Offer details.', async () => {
    await fixture.whenStable();

    expect(component.offer).toEqual(OFFERS[0]);
    expect(component.editedOfferIdChange.emit).toHaveBeenCalled();

    const inputs = element.querySelectorAll('input');

    expect(inputs[0].value).toBe(OFFERS[0].title);
    expect(inputs[1].value).toBe(OFFERS[0].description);
    expect(inputs[2].value).toBe(OFFERS[0].valueHighestBid.toString());
  });

  it('Should forget changes when switching between different Offers', async () => {
    await fixture.whenStable();

    let titleInput: HTMLInputElement | null = element.querySelector(`input[name='title']`);
    const newTitle = 'Awesome title 1';

    titleInput!.value = newTitle;

    await dispatchEvent(titleInput!, 'input', fixture);

    titleInput = element.querySelector(`input[name='title']`);

    expect(titleInput!.value).toBe(newTitle);

    component.editedOfferId = OFFERS[1].id;

    fixture.detectChanges();
    await fixture.whenStable();

    component.editedOfferId = OFFERS[0].id;

    fixture.detectChanges();
    await fixture.whenStable();

    titleInput = element.querySelector(`input[name='title']`);

    expect(titleInput!.value).not.toBe(newTitle);
  });

  it('Should disable the save and reset buttons by default when no changes are made', async () => {
    await fixture.whenStable();

    const saveBtn: HTMLButtonElement | null = element.querySelector('button.btn-success');
    const resetBtn: HTMLButtonElement | null = element.querySelector('button.btn-secondary');

    expect(saveBtn!.disabled).toBeTrue();
    expect(resetBtn!.disabled).toBeTrue();
  });

  it('Should prompt for unsaved changes when resetting, clearing, canceling while editing an Offer', async () => {
    spyOn(window, 'confirm').and.returnValue(false);

    await fixture.whenStable();

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

  it('Should emit editingOfferIdChange when deleting an Offer', async () => {
    await fixture.whenStable();

    const deleteBtn: HTMLButtonElement | null = element.querySelector('button.btn-danger');
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(offersService, 'deletebyId').and.callFake((offerId: number) => {

      expect(offerId).toBe(OFFERS[0].id);

      return OFFERS[0];
    });

    deleteBtn!.click();
    fixture.detectChanges();

    await fixture.whenStable();

    expect(offersService.deletebyId).toHaveBeenCalled();
    expect(component.editedOfferId).toBeNull();
    expect(element.querySelector('table')).toBeNull();
  });

  it('Should not delete an Offer when the action was not confirmed', async () => {
    await fixture.whenStable();

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
    await fixture.whenStable();

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

  it('Should unselect the current Offer when the edit is canceled', async () => {
    await fixture.whenStable();

    const cancelBtn: HTMLButtonElement | null = element.querySelector('button.btn-primary');
    spyOn(window, 'confirm').and.returnValue(true);

    cancelBtn!.click();
    fixture.detectChanges();

    await fixture.whenStable();

    expect(element.querySelector('table')).toBeNull();
    expect(component.offer).toBeNull();
  });

  it('Should reset made changes to original state on reset button click', async () => {
    await fixture.whenStable();

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
    await fixture.whenStable();

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
});
