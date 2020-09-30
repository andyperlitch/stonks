export interface IonRouteProps {
  computedMatch: IonRouteComputedMatch
}

export interface IonRouteComputedMatch {
  isExact: boolean
  params?: any
  path: string
  url: string
}
