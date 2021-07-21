import { Component, OnInit } from '@angular/core';

import { generateRandomOffers } from '@models/common';
import { Offer } from '@models/offer.model';

@Component({
  selector: 'auc-overview1',
  templateUrl: './overview1.component.html',
  styleUrls: [ './overview1.component.scss' ],
})
export class Overview1Component implements OnInit {

  offers: Offer[];

  private offersGenerated: number;

  ngOnInit(): void {
    this.offers = generateRandomOffers();
    this.offersGenerated = this.offers.length;
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
