import { getAvatarTemplateData } from '../../../utils/getAvatarTemplateData'
import { GraphQLContext } from '../../../types/graphql'
import {
  AvatarTemplateFrame,
  QueryResolvers,
} from '../../../types/graphql-types'

/**
 * Returns meta information about avatar template
 */
export const avatarTemplateResolver: QueryResolvers<
  GraphQLContext
>['avatarTemplate'] = async () => {
  const metadata = await getAvatarTemplateData()

  const frames: AvatarTemplateFrame[] = Object.keys(metadata.frames).reduce<
    any
  >((acc, key, index) => {
    const [animationName, _frameNumber, layerName] = key.split(':')
    const frameNumber = parseInt(_frameNumber)
    const [partType, partName, subPartName] = layerName.split('.')
    const frame = metadata.frames[key]

    metadata.meta.slices.forEach((slice) => {
      const bounds = slice.keys[0].bounds
      acc.push({
        index,
        animationName,
        frameNumber,
        partType,
        partName,
        subPartName,
        sliceName: slice.name,
        coordinates: {
          w: bounds.w,
          h: bounds.h,
          x: frame.frame.x + bounds.x,
          y: frame.frame.y + bounds.y,
        },
      })
    })

    return acc
  }, [])
  return {
    imageUrl: '/assets/avatar.png',
    frames,
  }
}
