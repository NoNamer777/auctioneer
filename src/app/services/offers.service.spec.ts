import { TestBed } from '@angular/core/testing';

import { OffersService } from '@services/offers.service';
import { Offer } from '@models/offer.model';
import { AuctionStatus } from '@models/auction-status.enum';
import * as common from '@models/common';

import { OFFERS } from '@app/testing/models/offer.mock';

describe('OffersService', () => {

  let offersService: OffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    spyOn(common, 'generateRandomOffers').and.returnValue(Object.assign([], OFFERS));

    offersService = TestBed.inject(OffersService);
  });

  it('Should return all Offers', () => {
    expect(offersService.findAll()).toEqual(OFFERS);
  });

  it('Should find an Offer by ID', () => {
    expect(offersService.findById(10_001)).toEqual(OFFERS[0]);
  });

  it('Should not find an Offer when the provided ID is null', () => {
    expect(offersService.findById(null)).toBeNull();
  });

  it('Should not find an Offer when the provided ID is not found within the list of Offers', () => {
    expect(offersService.findById(10_003)).toBeNull();
  });

  it('Should save add a new Offer to the list', () => {
    const offer = new Offer(
      10_003,
      'Amazing title 3',
      AuctionStatus.FOR_SALE,
      'Amazing description 3',
      new Date(),
      3_000,
    );

    expect(offersService.save(offer)).toBeNull();
  });

  it('Should update an Offer in the list when saving an Offer', () => {
    const offer = Object.assign(new Offer(), OFFERS[1]);

    offer.description = 'Even better description';
    offer.sellDate = new Date(2000, 0, 1);

    expect(offersService.save(offer)).toEqual(OFFERS[1]);
    expect(offersService['offers'][1]).toEqual(offer);
  });

  it('Should remove an Offer from the list when deleting an Offer by ID', () => {
    expect(offersService.deletebyId(OFFERS[0].id)).toEqual(OFFERS[0]);
  });

  it('Should return null when trying to delete an Offer by ID that is not in the list', () => {
    expect(offersService.deletebyId(10_003)).toEqual(null);
  });
});
