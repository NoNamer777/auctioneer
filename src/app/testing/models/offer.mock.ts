import { AuctionStatus } from "@models/auction-status.enum";
import { Offer } from "@models/offer.model";

export const OFFERS = [
  new Offer(
    10_001,
    'Amazing title 1',
    AuctionStatus.CLOSED,
    'Amazing description 1',
    new Date(),
    1_000,
  ),
  new Offer(
    10_002,
    'Amazing title 2',
    AuctionStatus.DELIVERD,
    'Amazing description 2',
    new Date(),
    2_000,
  ),
];
