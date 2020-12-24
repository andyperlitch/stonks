import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'
import { SelectAvatar, SelectAvatarVariables } from './types/SelectAvatar'

const SELECT_AVATAR = gql`
  mutation SelectAvatar($input: SelectAvatarInput!) {
    selectAvatar(input: $input) {
      id
      currentAvatar
    }
  }
`

export const useSelectAvatar = () => {
  const [selectAvatar, { loading, error }] = useMutation<
    SelectAvatar,
    SelectAvatarVariables
  >(SELECT_AVATAR)

  return { selectAvatar, loading, error }
}
