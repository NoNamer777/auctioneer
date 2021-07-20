import { Component, OnInit } from '@angular/core';
import { Offer } from '@app/models/offer.model';

export const BASE_NUMBER_OF_OFFERS_GENERATED = 8;

@Component({
  selector: 'auc-overview1',
  templateUrl: './overview1.component.html',
  styleUrls: [ './overview1.component.scss' ],
})
export class Overview1Component implements OnInit {

  offers: Offer[];

  private offersGenerated = BASE_NUMBER_OF_OFFERS_GENERATED;

  ngOnInit(): void {
    this.offers = [];

    for (let i = 0; i < BASE_NUMBER_OF_OFFERS_GENERATED;) {
      this.offers.push(Offer.randomOffer(++i));
    }
  }

  onAddOffer(): void {
    this.offers.push(Offer.randomOffer(++this.offersGenerated));
  }

  offerSellDate(date: Date): string {
    return date.toLocaleString('en-NL', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
}
