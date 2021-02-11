import * as types from '../types/game'
import { Stonk } from './Stonk'

export class Player {
  public name: string
  public portfolio: types.PlayerPortfolio = {}
  public buyingPower: number = 0 // in cents

  public canBuy(stonk: Stonk, shares: number) {
    return shares * stonk.price < this.buyingPower
  }
  public buy(stonk: Stonk, shares: number = 1) {
    this.buyingPower -= shares * stonk.price
    this.portfolio[stonk.ticker] = {
      ticker: stonk.ticker,
      shares: (this.portfolio[stonk.ticker]?.shares || 0) + shares,
    }
  }
  public canSell(stonk: Stonk, shares: number) {
    return (this.portfolio[stonk.ticker]?.shares || 0) >= shares
  }
  public sell(stonk: Stonk, shares: number = 1) {
    this.buyingPower += shares * stonk.price
    this.portfolio[stonk.ticker] = {
      ticker: stonk.ticker,
      shares: (this.portfolio[stonk.ticker]?.shares || 0) - shares,
    }
  }
  public toJSON(): Pick<types.Player, 'name' | 'portfolio' | 'buyingPower'> {
    return {
      name: this.name,
      portfolio: this.portfolio,
      buyingPower: this.buyingPower,
    }
  }
  constructor({ name, buyingPower }: { name: string; buyingPower: number }) {
    this.name = name
    this.buyingPower = buyingPower
  }
}
