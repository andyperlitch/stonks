import { compile } from 'path-to-regexp'

const ROOT = '/'
const HOME = '/home'
const LOGIN = '/login'
const AVATARS = '/avatars'
const AVATAR_EDIT = `${AVATARS}/:avatarId`
const AVATAR_EDIT_DETAIL = `${AVATAR_EDIT}/:detail`
const AVATAR_EDIT_INFO = `${AVATAR_EDIT}/info`
const AVATAR_EDIT_SKIN = `${AVATAR_EDIT}/skin`
const AVATAR_EDIT_HAIR = `${AVATAR_EDIT}/hair`
const AVATAR_EDIT_EYES = `${AVATAR_EDIT}/eyes`
const AVATAR_EDIT_TOP = `${AVATAR_EDIT}/top`
const AVATAR_EDIT_BOTTOM = `${AVATAR_EDIT}/bottom`

export const routes = {
  ROOT,
  HOME,
  LOGIN,
  AVATARS,
  AVATAR_EDIT,
  AVATAR_EDIT_DETAIL,
  AVATAR_EDIT_INFO,
  AVATAR_EDIT_SKIN,
  AVATAR_EDIT_HAIR,
  AVATAR_EDIT_EYES,
  AVATAR_EDIT_TOP,
  AVATAR_EDIT_BOTTOM,
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
