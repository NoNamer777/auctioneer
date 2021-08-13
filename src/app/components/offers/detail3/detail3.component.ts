import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { OffersService } from '@services/offers.service';
import { DELETE_CONFIRMATION_MESSAGE, DISCARD_CHANGES_CONFIRMATION_MESSAGE } from '@models/common';
import { AuctionStatus } from '@models/auction-status.enum';
import { Offer } from '@models/offer.model';

@Component({
  selector: 'auc-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: [ './detail3.component.scss' ],
})
export class Detail3Component implements OnChanges {

  get editedOfferId(): number | null {
    return this._editedOfferId;
  }

  @Input()
  set editedOfferId(value: number | null) {
    if (this._editedOfferId == value) return;

    this._editedOfferId = value;

    this.editedOfferIdChange.emit(this.editedOfferId);

    if (value == null) {
      this.offer = null;

      return;
    }

    this.offer = Offer.clone(this.offersService.findById(this.editedOfferId)!);
  }

  private _editedOfferId: number | null;

  @Output()
  editedOfferIdChange = new EventEmitter<number | null>();

  offer: Offer | null = null;

  offerStatuses = Object.keys(AuctionStatus);

  auctionStatus = AuctionStatus;

  constructor(private offersService: OffersService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.editedOfferId = changes.editedOfferId.currentValue;
  }

  get hasNotBeenEdited(): boolean {
    const original = Offer.clone(this.offersService.findById(this.editedOfferId)!);

    return this.offer!.equals(original);
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
    if (!confirm(DELETE_CONFIRMATION_MESSAGE(this.editedOfferId!))) {
      return;
    }

    this.offersService.deletebyId(this.editedOfferId!);

    this.editedOfferId = null;
  }

  onSave(): void {
    this.offersService.save(this.offer!);
  }

  onClear(): void {
    if (!this.hasNotBeenEdited && !confirm(DISCARD_CHANGES_CONFIRMATION_MESSAGE)) return;

    this.offer = new Offer(this.offer!.id);
  }

  onReset(): void {
    if (!this.hasNotBeenEdited && !confirm(DISCARD_CHANGES_CONFIRMATION_MESSAGE)) return;

    this.offer = Offer.clone(this.offersService.findById(this.editedOfferId)!)
  }

  onCancel(): void {
    if (!this.hasNotBeenEdited && !confirm(DISCARD_CHANGES_CONFIRMATION_MESSAGE)) return;

    this.editedOfferId = null;
  }
}
