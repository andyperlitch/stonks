import * as types from '../types/game'

const VOLATILITY_CHANGE_PER_SHARE = 0.0002
const BULL_PERCENT_PER_SHARE = 0.0005
export class Stonk {
  /**
   * How much the stock price changes each time a single stock is bought or sold
   */
  public volatility: types.StonkVolatility = {
    up: 0.05,
    down: 0.05,
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
  public buy(quantity: number, isRealPlayer: boolean = false) {
    this.price += this.price * this.volatility.up * quantity
    if (isRealPlayer) {
      this.bullPercent += BULL_PERCENT_PER_SHARE * quantity
      this.volatility.up += VOLATILITY_CHANGE_PER_SHARE * quantity
    }
  }

  /**
   * Changes the price based on a sell event
   */
  public sell(quantity: number, isRealPlayer: boolean = false) {
    this.price -= this.price * this.volatility.down * quantity
    this.price = Math.max(this.price, 1)
    if (isRealPlayer) {
      this.bullPercent -= BULL_PERCENT_PER_SHARE * quantity
      this.volatility.up -= VOLATILITY_CHANGE_PER_SHARE * quantity
    }
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
      this.bullPercent += change.bullPercent
    }
    if (change.volatility) {
      this.volatility = {
        up: this.volatility.up + (change.volatility.up ?? 0),
        down: this.volatility.down + (change.volatility.down ?? 0),
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
