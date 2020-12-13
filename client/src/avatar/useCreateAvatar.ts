import { CreateAvatar, CreateAvatarVariables } from './types/CreateAvatar'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'

const CREATE_AVATAR = gql`
  mutation CreateAvatar($input: CreateAvatarInput!) {
    createAvatar(input: $input) {
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

export const useCreateAvatar = () => {
  const [createAvatar, { loading, error }] = useMutation<
    CreateAvatar,
    CreateAvatarVariables
  >(CREATE_AVATAR)

  return { createAvatar, loading, error }
}
