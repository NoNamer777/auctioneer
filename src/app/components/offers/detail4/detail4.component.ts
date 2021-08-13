import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { OffersService } from '@services/offers.service';
import { DestroyedListeningComponent } from '@components/destroyed-listening/destroyed-listening.component';
import { DELETE_CONFIRMATION_MESSAGE, DISCARD_CHANGES_CONFIRMATION_MESSAGE } from '@models/common';
import { Offer } from '@models/offer.model';
import { AuctionStatus } from '@models/auction-status.enum';

@Component({
  selector: 'auc-detail4',
  templateUrl: './detail4.component.html',
  styleUrls: [ './detail4.component.scss' ],
})
export class Detail4Component extends DestroyedListeningComponent implements OnInit {

  offer: Offer;

  offerStatuses = Object.keys(AuctionStatus);

  auctionStatus = AuctionStatus;

  constructor(private router: Router, private route: ActivatedRoute, private offersService: OffersService) {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe((params: Params) => {
      this.offer = Offer.clone(this.offersService.findById(+params.offerId)!);
    });
  }

  get hasNotBeenEdited(): boolean {
    const original = Offer.clone(this.offersService.findById(this.offer.id)!);

    return this.offer.equals(original);
  }

  get hasBeenEdited(): boolean {
    return !this.hasNotBeenEdited;
  }

  get hasBeenCleared(): boolean {
    const offerObj = JSON.parse(JSON.stringify(this.offer));

    delete offerObj._id;

    return JSON.stringify(offerObj) === '{}';
  }

  onDelete(): void {
    if (!confirm(DELETE_CONFIRMATION_MESSAGE(this.offer.id))) {
      return;
    }

    this.offersService.deletebyId(this.offer.id);

    this.stopEditing();
  }

  onSave(): void {
    this.offersService.save(this.offer);

    this.offer = Offer.clone(this.offer);
  }

  onClear(): void {
    if (!this.hasNotBeenEdited && !confirm(DISCARD_CHANGES_CONFIRMATION_MESSAGE)) return;

    this.offer = new Offer(this.offer.id);
  }

  onReset(): void {
    if (!this.hasNotBeenEdited && !confirm(DISCARD_CHANGES_CONFIRMATION_MESSAGE)) return;

    this.offer = Offer.clone(this.offersService.findById(this.offer.id)!)
  }

  onCancel(): void {
    if (!this.hasNotBeenEdited && !confirm(DISCARD_CHANGES_CONFIRMATION_MESSAGE)) return;

    this.stopEditing();
  }

  private stopEditing(): void {
    this.router.navigate(['/offers/overview4']);
  }
}
