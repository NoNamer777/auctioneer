import { Offer } from "./offer.model";

export const BASE_NUMBER_OF_OFFERS_GENERATED = 8;

export type NullishValue = null | undefined;

export function randomNumber(base: number = 0, modifier: number = 0): number {
  return base + Math.round(Math.random() * modifier);
}

export function generateRandomOffers(): Offer[] {
  const offers: Offer[] = [];

  for (let i = 0; i < BASE_NUMBER_OF_OFFERS_GENERATED;) {
    offers.push(Offer.randomOffer(++i));
  }

  return offers;
}

export const DISCARD_CHANGES_CONFIRMATION_MESSAGE = 'Are you sure to discard unsaved changes?';

export function DELETE_CONFIRMATION_MESSAGE(offerId: number) {
  return `Are you sure you want to delete Offer with id: '${offerId}'?\nThis change is unrevertable.`;
}
