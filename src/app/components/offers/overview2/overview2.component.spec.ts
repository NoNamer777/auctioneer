import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Overview2Component } from '@components/offers/overview2/overview2.component';
import { BASE_NUMBER_OF_OFFERS_GENERATED } from '@app/models/common';

describe('Overview2Component', () => {

  let fixture: ComponentFixture<Overview2Component>;
  let component: Overview2Component;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        Overview2Component,
      ],
    })
    .overrideTemplate(Overview2Component, `
      <section>
        <h3>Overview of all offered articles</h3>
        <div class="d-flex justify-content-between">
          <div>
            <div class="table-responsive-md">
              <table class="table table-striped table-hover table-bordered">
                <thead>
                  <tr class="table-primary">
                    <th scope="col">Offer Title</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let offer of offers">
                    <td scope="row" (click)="onSelectOffer(offer)" [class.table-info]="selectedOffer === offer">
                      {{ offer.title }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-primary" type="button" (click)="onAddOffer()">Add Offer</button>
            </div>
          </div>
        </div>
      </section>
    `)
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Overview2Component);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('Should render Offers in the list', async () => {
    await fixture.whenStable()

    const entries = element.querySelectorAll('tr');

    // Account 1 extra table row for the table headers.
    expect(entries.length).toBe(component.offers.length + 1);
  });

  it('Should not emit when the selected Offer is selected again', async () => {
    spyOn(component.offerSelected, 'emit');

    expect(component.offerSelected.emit).not.toHaveBeenCalled();

    await fixture.whenStable();

    const clickedOffer = fixture.debugElement.query(By.css(`td[scope='row']`));

    clickedOffer.triggerEventHandler('click', null);
    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.selectedOffer).not.toBeNull();
    expect(component.offerSelected.emit).toHaveBeenCalled();

    clickedOffer.triggerEventHandler('click', null);
    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.selectedOffer).not.toBeNull();
    expect(component.offerSelected.emit).toHaveBeenCalledTimes(1);
  });

  it('Should emit when an Offer is selected', async () => {
    const addOfferButton = element.querySelector('button');
    spyOn(component.offerSelected, 'emit');

    expect(component.offers.length).toBe(BASE_NUMBER_OF_OFFERS_GENERATED);
    expect(component.offerSelected.emit).not.toHaveBeenCalled();

    addOfferButton!.click();
    fixture.detectChanges();

    await fixture.whenStable();
    const offerElements = element.querySelectorAll('tr');

    // Account 1 extra table row for the table headers.
    expect(offerElements.length).toBe(BASE_NUMBER_OF_OFFERS_GENERATED + 2);
    expect(component.offerSelected.emit).toHaveBeenCalled();
  });

  it('Should delete an Offer by ID', async () => {
    await fixture.whenStable();

    component.onDeleteOffer(component.offers[3].id);
    fixture.detectChanges();

    await fixture.whenStable();

    const offerElements = element.querySelectorAll('tr');

    // Account 1 extra table row for the table headers.
    expect(offerElements.length).toBe(8);
  })

  it('Should add a new randomly generated Offer on button click', async () => {
    const addOfferButton: HTMLButtonElement | null = element.querySelector('button');

    // Account 1 extra table row for the table headers.
    expect(element.querySelectorAll('tr').length).toBe(component.offers.length + 1);

    addOfferButton!.click();
    fixture.detectChanges();

    await fixture.whenStable()

    expect(element.querySelectorAll('tr').length).toBe(component.offers.length + 1);
  });
});
