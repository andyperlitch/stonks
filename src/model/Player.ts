import * as types from '../types/game'
import { Stonk } from './Stonk'

export class Player {
  public name: string
  public color: string
  public avatar: string
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
  public toJSON(): Pick<
    types.Player,
    'name' | 'color' | 'avatar' | 'portfolio' | 'buyingPower'
  > {
    return {
      name: this.name,
      color: this.color,
      avatar: this.avatar,
      portfolio: this.portfolio,
      buyingPower: this.buyingPower,
    }
  }
  constructor({
    name,
    buyingPower,
    color,
    avatar,
  }: {
    name: string
    buyingPower: number
    color: string
    avatar: string
  }) {
    this.name = name
    this.buyingPower = buyingPower
    this.color = color
    this.avatar = avatar
  }
}
