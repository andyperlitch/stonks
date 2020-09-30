import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'
import { UpdateAvatar } from './types/UpdateAvatar'

const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($input: UpdateAvatarInput!) {
    updateAvatar(input: $input) {
      id
      components {
        optionId
        type
        hue
        saturation
        lightness
        contrast
      }
      name
    }
  }
`

export const useUpdateAvatar = () => {
  const [updateAvatar, { loading, error }] = useMutation<UpdateAvatar>(
    UPDATE_AVATAR,
  )

  return { updateAvatar, loading, error }
}
