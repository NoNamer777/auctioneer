import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { generateRandomOffers } from '@models/common';
import { Offer } from '@models/offer.model';

@Component({
  selector: 'auc-overview2',
  templateUrl: './overview2.component.html',
  styleUrls: [ './overview2.component.scss' ],
})
export class Overview2Component implements OnInit {

  @Output()
  offerSelected = new EventEmitter<Offer | null>();

  selectedOffer: Offer | null;

  offers: Offer[];

  private offersGenerated: number;

  ngOnInit(): void {
    this.offers = generateRandomOffers();
    this.offersGenerated = this.offers.length;
  }

  onAddOffer(): void {
    this.offers.push(Offer.randomOffer(++this.offersGenerated));

    this.onSelectOffer(this.offers[this.offers.length - 1]);
  }

  onSelectOffer(offer: Offer | null): void {
    if (this.selectedOffer == offer) {
      return;
    }

    this.selectedOffer = offer;
    this.offerSelected.emit(this.selectedOffer);
  }

  onDeleteOffer(offerId: number): void {
    this.onSelectOffer(null);

    for (const offer of this.offers) {
      if (offer.id !== offerId) continue;

      const index = this.offers.indexOf(offer);

      this.offers.splice(index, 1);
    }
  }
}
