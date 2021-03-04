import * as types from '../types/game'

export class Stonk {
  /**
   * How much the stock price changes each time a single stock is bought or sold
   */
  public volatility = 0.5

  /**
   * Number of shares outstanding
   */
  public outstanding = 1000

  /**
   * The share price, in cents
   */
  public price = 100

  public get marketCap() {
    return this.outstanding * this.price
  }

  /**
   * Changes the price based on a buy event
   */
  public buy(quantity: number) {
    this.price = this.price + this.volatility * quantity
  }

  /**
   * Changes the price based on a sell event
   */
  public sell(quantity: number) {
    this.price = this.price - this.volatility * quantity
  }

  public toJSON(): types.Stonk {
    return {
      ticker: this.ticker,
      price: this.price,
      outstanding: this.outstanding,
    }
  }

  constructor(public ticker: string) {}
}
