import { FetchAvatars } from './types/FetchAvatars'
import { useQuery } from 'react-apollo'
import { gql } from 'apollo-boost'
const FETCH_AVATARS = gql`
  query FetchAvatars {
    myAvatars {
      id
      name
      components {
        optionId
        type
        hue
        saturation
        lightness
        contrast
      }
    }
  }
`

export const useFetchAvatars = () => {
  const { data, loading, error, refetch } = useQuery<FetchAvatars>(
    FETCH_AVATARS,
  )
  return {
    avatars: data?.myAvatars || [],
    loading,
    error,
    refetch,
  }
}
