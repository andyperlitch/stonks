import {
  FetchAvatars_myAvatars,
  FetchAvatars_myAvatars_components,
} from '../../avatar/types/FetchAvatars'
export type Avatar = Pick<
  FetchAvatars_myAvatars,
  'id' | 'components' | 'name'
> & { __typename?: string }
export type AvatarComponentUpdate = { type: string } & Partial<
  FetchAvatars_myAvatars_components
>
