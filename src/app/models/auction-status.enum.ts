export enum AuctionStatus {
  NEW = 'NEW',
  FOR_SALE = 'FOR_SALE',
  SOLD = 'SOLD',
  PAID = 'PAID',
  DELIVERD = 'DELIVERD',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
  WITHDRAWN = 'WITHDRAWN',
}

export function randomAuctionStatus(): AuctionStatus {
  const statuses = Object.keys(AuctionStatus);

  return AuctionStatus[statuses[Math.round(Math.random() * (statuses.length - 1))]];
}
