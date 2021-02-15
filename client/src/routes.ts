import { compile } from 'path-to-regexp'

const ROOT = '/'
const HOME = '/home'
const LOGIN = '/login'
const NEW_GAME = '/new-game'
const JOIN_GAME = '/join-game'
const GAME = '/games/:id'

export const routes = {
  ROOT,
  HOME,
  LOGIN,
  NEW_GAME,
  JOIN_GAME,
  GAME,
}

const urlBuilders = Object.values(routes).reduce((acc, cur) => {
  acc[cur] = compile(cur)
  return acc
}, {} as any)

export const buildUrl = (
  pathTemplate: string,
  params: { [key: string]: string },
) => {
  const builder = urlBuilders[pathTemplate]
  if (!builder) {
    return compile(pathTemplate)(params)
  }
  return builder(params)
}
