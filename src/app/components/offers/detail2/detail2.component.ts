import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuctionStatus } from '@app/models/auction-status.enum';
import { Offer } from '@app/models/offer.model';

@Component({
  selector: 'auc-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: [ './detail2.component.scss' ],
})
export class Detail2Component {

  @Input()
  offer: Offer | null;

  @Output()
  deleteOffer = new EventEmitter<number>();

  offerStatuses = Object.keys(AuctionStatus);

  auctionStatus = AuctionStatus;

  onDelete(): void {
    this.deleteOffer.emit(this.offer!.id);
  }
}
