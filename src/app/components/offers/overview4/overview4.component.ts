import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { OffersService } from '@services/offers.service';
import { DestroyedListeningComponent } from '@components/destroyed-listening/destroyed-listening.component';
import { Offer } from '@models/offer.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'auc-overview4',
  templateUrl: './overview4.component.html',
  styleUrls: [ './overview4.component.scss' ],
})
export class Overview4Component extends DestroyedListeningComponent {

  selectedOffer: Offer | null;

  private offersGenerated: number;

  constructor(
    private offersService: OffersService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();

    this.offersGenerated = offersService.findAll().length;

    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(routingEvent => {
      if (!(routingEvent instanceof NavigationEnd)) {
        return;
      }

      const offerId = Number.parseInt(routingEvent.url.split('/')[routingEvent.url.split('/').length - 1], 10);

      if (Number.isNaN(offerId)) {
        return;
      }

      const selectedOffer = this.offersService.findById(offerId);

      if (selectedOffer == null) return;

      this.onSelectOffer(selectedOffer);
    });
  }

  get offers(): Offer[] {
    return this.offersService.findAll();
  }

  onAddOffer(): void {
    const newOffer = Offer.randomOffer(++this.offersGenerated);

    this.offersService.save(newOffer);

    this.router.navigate([newOffer.id], { relativeTo: this.route });
  }

  onSelectOffer(offer: Offer): void {
    if (this.selectedOffer?.id == offer.id) {
      return;
    }

    this.selectedOffer = offer;

    this.router.navigate([offer.id], { relativeTo: this.route });
  }
}
