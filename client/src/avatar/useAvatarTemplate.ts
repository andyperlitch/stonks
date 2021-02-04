import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'
import useImage from 'use-image'
import { GetAvatarTemplate } from './types/getAvatarTemplate'

const GET_AVATAR_TEMPLATE = gql`
  query GetAvatarTemplate {
    avatarTemplate {
      imageUrl
      skinColors {
        id
        previewColor
        hue
        saturation
        lightness
        contrast
      }
      frames {
        index
        animationName
        frameNumber
        partType
        partName
        subPartName
        sliceName
        coordinates {
          x
          y
          w
          h
        }
      }
    }
  }
`

/**
 * Loads the metadata required to use the avatar template for real-time rendering
 * while creating an avatar.
 */
const useAvatarTemplate = () => {
  const { data, loading, error } = useQuery<GetAvatarTemplate>(
    GET_AVATAR_TEMPLATE,
  )
  const [avatarImage] = useImage(data?.avatarTemplate.imageUrl || '')
  return {
    image: avatarImage,
    frames: data?.avatarTemplate.frames,
    skinColors: data?.avatarTemplate.skinColors,
    loading,
    error,
  }
}

export default useAvatarTemplate
