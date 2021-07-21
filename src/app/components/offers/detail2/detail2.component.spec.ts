import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Detail2Component } from '@components/offers/detail2/detail2.component';
import { AuctionStatus } from '@models/auction-status.enum';
import { Offer } from '@models/offer.model';


describe('Detail2Component', () => {

  let fixture: ComponentFixture<Details2MockComponent>;

  let component: Details2MockComponent;
  let element: HTMLElement;

  const OFFER = new Offer(
    10_001,
    'Awesome title',
    AuctionStatus.FOR_SALE,
    'Awesome description',
    new Date(2000, 0, 1),
    100
  );

  @Component({
    template: `<auc-detail2 [offer]="offer" (deleteOffer)="offerDeleted()"></auc-detail2>`,
    selector: 'auc-detail2-mock'
  })
  class Details2MockComponent {

    offer = OFFER;

    deleted = false;

    offerDeleted(): void {
      this.deleted = true;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        Detail2Component,
        Details2MockComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Details2MockComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('Should render details about the provided Offer', async () => {
    const offerDetailsTable = element.querySelector('table');
    const tableHeader = offerDetailsTable!.querySelector('th');
    const inputs: NodeListOf<HTMLInputElement> = offerDetailsTable!.querySelectorAll('input');

    expect(tableHeader!.innerText.includes(OFFER.id.toString())).toBeTrue();

    expect(inputs.length).toBe(3);

    await fixture.whenStable();

    expect(inputs[0].value).toBe(OFFER.title);
    expect(inputs[1].value).toBe(OFFER.description);
    expect(inputs[2].value).toBe(OFFER.valueHighestBid.toString());
  });

  it('Should emit when an Offer should be deleted', async () => {
    const deleteButton = element.querySelector('button');

    deleteButton!.click();
    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.deleted).toBeTrue();
  });
});
