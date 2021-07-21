import { Component } from '@angular/core';

import { OffersService } from '@services/offers.service';
import { Offer } from '@models/offer.model';

@Component({
  selector: 'auc-overview3',
  templateUrl: './overview3.component.html',
  styleUrls: [ './overview3.component.scss' ],
})
export class Overview3Component {

  selectedOfferId: number | null;

  private offersGenerated: number;

  constructor(private offersService: OffersService) {
    this.offersGenerated = offersService.findAll().length;
  }

  get offers(): Offer[] {
    return this.offersService.findAll();
  }

  onAddOffer(): void {
    const newOffer = Offer.randomOffer(++this.offersGenerated);

    this.offersService.save(newOffer);

    this.onSelectOffer(newOffer.id);
  }

  onSelectOffer(offerId: number | null): void {
    if (this.selectedOfferId == offerId) {
      return;
    }

    this.selectedOfferId = offerId;
  }
}
