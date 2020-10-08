import {
  AvatarAction,
  AVATAR_COMPONENT_CHANGED,
  AVATAR_LOADED,
  AVATAR_INFO_CHANGED,
} from './actions'
import { Avatar } from './types'

export const editAvatarReducer = (
  state: Avatar,
  action: AvatarAction,
): Avatar => {
  switch (action.type) {
    case AVATAR_LOADED: {
      return {
        ...action.payload.avatar,
      }
    }
    case AVATAR_INFO_CHANGED: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case AVATAR_COMPONENT_CHANGED: {
      const existingComponents = state.components
      const existingComponent = existingComponents.find(
        (c) => c.type === action.payload.type,
      )
      if (!existingComponent) {
        return state
      }
      const existingIndex = existingComponents.indexOf(existingComponent)
      return {
        ...state,
        components: [
          ...existingComponents.slice(0, existingIndex),
          {
            ...existingComponent,
            ...action.payload,
          },
          ...existingComponents.slice(existingIndex + 1),
        ],
      }
    }
    default: {
      throw new Error('Unknown action in editAvatarReducer')
    }
  }
}

export type EditAvatarReducer = typeof editAvatarReducer
