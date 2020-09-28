import { promises as fs } from 'fs'
import { resolve } from 'path'
import { AsepriteFile } from '../../types/aseprite'
import { AvatarTemplateFrame, QueryResolvers } from '../../types/graphql-types'

/**
 * Returns meta information about avatar template
 */
export const avatarTemplateResolver: QueryResolvers['avatarTemplate'] = async () => {
  const fileContent = await fs.readFile(
    resolve(__dirname, '../../../artwork/avatar.json'),
    'utf-8',
  )

  const metadata: AsepriteFile = JSON.parse(fileContent)

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
        flipped: false,
        coordinates: {
          w: bounds.w,
          h: bounds.h,
          x: frame.frame.x + bounds.x,
          y: frame.frame.y + bounds.y,
        },
      })

      if (['west', 'southwest', 'northwest'].includes(slice.name)) {
        acc.push({
          index,
          animationName,
          frameNumber,
          partType,
          partName,
          subPartName,
          sliceName: slice.name.replace('west', 'east'),
          flipped: true,
          coordinates: {
            w: bounds.w,
            h: bounds.h,
            x: frame.frame.x + bounds.x,
            y: frame.frame.y + bounds.y,
          },
        })
      }
    })

    return acc
  }, [])
  return {
    imageUrl: '/assets/avatar.png',
    frames,
  }
}
