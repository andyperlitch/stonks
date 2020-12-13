import { DeleteAvatar, DeleteAvatarVariables } from './types/DeleteAvatar'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'

const DELETE_AVATAR = gql`
  mutation DeleteAvatar($input: DeleteAvatarInput!) {
    deleteAvatar(input: $input) {
      id
    }
  }
`

export const useDeleteAvatar = () => {
  const [deleteAvatar, { loading, error }] = useMutation<
    DeleteAvatar,
    DeleteAvatarVariables
  >(DELETE_AVATAR)

  return { deleteAvatar, loading, error }
}
