import { AuctionStatus, randomAuctionStatus } from "@models/auction-status.enum";
import { randomNumber } from "@models/common";

enum Month {
  JANUARY   = 0,
  FEBRUARY  = 1,
  MARCH     = 2,
  APRIL     = 3,
  MAY       = 4,
  JUNE      = 5,
  JULY      = 6,
  AUGUST    = 7,
  SEPTEMBER = 8,
  OKTOKBER  = 9,
  NOVEMBER  = 10,
  DECEMBER  = 11,
}

enum MonthType {
  TWENTY_EIGTH_DAY_MONTH  = 28,
  TWENTY_NINE_DAY_MONTH   = 29,
  THIRTHY_DAY_MONTH       = 30,
  THIRTHY_ONE_DAY_MONTH   = 31,
}

/*
  This is based on the fact that the months are 0-indexed
  src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
*/
const NUMBER_OF_MONTHS_IN_YEAR = Object.keys(Month).length - 1;
const NUMBER_OF_HOURS_IN_DAY = 23;
const NUMBER_OF_MINUTES_IN_HOUR = 59;

const OFFER_ID_BASE = 10_000;
const OFFER_MAX_RND_BID_VALUE = 1_500;

const RND_SELL_DATE_YEAR_START = 2_000;
const RND_SELL_DATE_YEAR_RANGE = 40;

export class Offer {

  id: number;

  title: string;

  auctionStatus: AuctionStatus;

  description: string;

  sellDate: Date;

  valueHighestBid: number;

  static randomOffer(id: number): Offer {
    const random = new Offer();

    random.id = OFFER_ID_BASE + id;
    random.title = `A great article offer-${id}`;
    random.auctionStatus = randomAuctionStatus();
    random.sellDate = this.randomDateTime();
    random.valueHighestBid = this.randomBid(random.auctionStatus);

    return random;
  }

  private static randomDateTime(): Date {
    const randomYear = randomNumber(RND_SELL_DATE_YEAR_START, RND_SELL_DATE_YEAR_RANGE);
    const randomMonth = randomNumber(0, NUMBER_OF_MONTHS_IN_YEAR);
    let randomDay = randomNumber(1, MonthType.THIRTHY_ONE_DAY_MONTH);
    let randomHour = randomNumber(0, NUMBER_OF_HOURS_IN_DAY);
    let randomMinutes = randomNumber(0, NUMBER_OF_MINUTES_IN_HOUR);

    if ([Month.APRIL, Month.JUNE, Month.SEPTEMBER, Month.NOVEMBER].includes(randomMonth) && randomDay > MonthType.THIRTHY_DAY_MONTH) {
      randomDay = randomNumber(1, MonthType.THIRTHY_DAY_MONTH);
    }

    // Handle February
    if (randomMonth !== Month.FEBRUARY) {
      return new Date(randomYear, randomMonth, randomDay, randomHour, randomMinutes);
    }
    randomDay = randomNumber(1, MonthType.TWENTY_EIGTH_DAY_MONTH);

    // Handle leap years src: https://www.timeanddate.com/date/leapyear.html
    if (randomYear % 100 !== 0 && (randomYear % 4 === 0 || randomYear % 400 === 0)) {
      	randomDay = randomNumber(1, MonthType.TWENTY_NINE_DAY_MONTH);
    }
    return new Date(randomYear, randomMonth, randomDay, randomHour, randomMinutes);
  }

  private static randomBid(auctionStatus: AuctionStatus): number {
    return auctionStatus == AuctionStatus.NEW ? 0 : randomNumber(0, OFFER_MAX_RND_BID_VALUE);
  }
}
