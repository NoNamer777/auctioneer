import { Injectable } from '@angular/core';

import { generateRandomOffers } from '@models/common';
import { Offer } from '@models/offer.model';

@Injectable({ providedIn: 'root' })
export class OffersService {

  private offers: Offer[];

  constructor() {
    this.offers = generateRandomOffers();
  }

  findAll(): Offer[] {
    return this.offers;
  }

  findById(offerId: number | null): Offer | null {
    if (offerId == null) return null;

    for (const offer of this.findAll()) {
      if (offer.id !== offerId) continue;

      return offer;
    }

    return null;
  }

  save(offer: Offer): Offer | null {
    const oldOffer = this.findById(offer.id);

    if (oldOffer == null) {
      this.offers.push(offer);

      return null;
    }

    return this.updateOffer(offer, oldOffer);
  }

  deletebyId(offerId: number): Offer | null {
    const foundOffer = this.findById(offerId);

    if (foundOffer == null) return null;

    return this.updateOffer(null, foundOffer);
  }

  private updateOffer(newOffer: Offer | null, oldOffer: Offer): Offer {
    const oldOfferIndex = this.offers.indexOf(oldOffer);

    if (newOffer != null) {
      this.offers.splice(oldOfferIndex, 1, newOffer);
    }
    else {
      this.offers.splice(oldOfferIndex, 1);
    }

    return oldOffer;
  }
}
