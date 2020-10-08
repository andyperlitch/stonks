import { Avatar, AvatarComponentUpdate } from './types'

export const AVATAR_LOADED = 'AVATAR_LOADED' as const
export const avatarLoaded = ({ avatar }: { avatar: Avatar }) => ({
  type: AVATAR_LOADED,
  payload: {
    avatar,
  },
})

export const AVATAR_COMPONENT_CHANGED = 'AVATAR_COMPONENT_CHANGED' as const
export const avatarComponentChanged = (payload: AvatarComponentUpdate) => ({
  type: AVATAR_COMPONENT_CHANGED,
  payload,
})

export const AVATAR_INFO_CHANGED = 'AVATAR_INFO_CHANGED' as const
export const avatarInfoChanged = (payload: { name: string }) => ({
  type: AVATAR_INFO_CHANGED,
  payload,
})

export type AvatarAction =
  | ReturnType<typeof avatarLoaded>
  | ReturnType<typeof avatarComponentChanged>
  | ReturnType<typeof avatarInfoChanged>
