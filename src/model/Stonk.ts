import * as types from '../types/game'

export class Stonk {
  /**
   * How much the stock price changes each time a single stock is bought or sold
   */
  public volatility: types.StonkVolatility = {
    up: 0.002,
    down: 0.002,
  }

  /**
   * How often does this stonk currently move up?
   */
  public bullPercent = 0.5

  /**
   * Queue of changes to affect this stonk over time
   */
  public changeQueue: types.QueuedStonkChange[] = []

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
    this.price += this.price * this.volatility.up * quantity
  }

  /**
   * Changes the price based on a sell event
   */
  public sell(quantity: number) {
    this.price -= this.price * this.volatility.down * quantity
  }

  public toJSON(): types.Stonk {
    return {
      ticker: this.ticker,
      price: this.price,
      outstanding: this.outstanding,
      volatility: this.volatility,
      bullPercent: this.bullPercent,
      changeQueue: this.changeQueue,
    }
  }

  public scheduleChange(change: types.QueuedStonkChange) {
    this.changeQueue.push(change)
  }

  public applyDueChanges(): void {
    const now = Date.now()
    while (this.changeQueue.length > 0 && this.changeQueue[0].startTime < now) {
      const changeToApply = this.changeQueue.shift()
      if (changeToApply) {
        this.applyChange(changeToApply)
      }
    }
  }

  private applyChange(change: types.QueuedStonkChange) {
    if (change.bullPercent) {
      this.bullPercent = change.bullPercent
    }
    if (change.volatility) {
      this.volatility = {
        ...this.volatility,
        ...change.volatility,
      }
    }
  }

  constructor(public ticker: string) {}

  static fromJSON(json: types.Stonk): Stonk {
    const stonk = new Stonk(json.ticker)
    stonk.price = json.price
    stonk.outstanding = json.outstanding
    stonk.volatility = json.volatility
    stonk.bullPercent = json.bullPercent
    stonk.changeQueue = json.changeQueue
    return stonk
  }
}
