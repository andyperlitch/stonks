import { AsepriteFile, Box } from '../types/aseprite'
import { useEffect, useMemo, useState } from 'react'
import useImage from 'use-image'

export interface FrameMeta {
  index: number
  animationName: string
  frameNumber: number
  partType: string
  partName: string
  subPartName: string
  sliceName: string
  flipped: boolean
  coordinates: Box
}

const getAvatarMeta = async (): Promise<AsepriteFile> => {
  return await (await fetch('/avatar.json')).json()
}

const useAvatarTemplate = () => {
  const [avatarImage] = useImage('/assets/avatar.png')
  const [metadata, setMetadata] = useState<AsepriteFile>()
  const [error, setError] = useState(null)
  useEffect(() => {
    getAvatarMeta().then(
      (metadata) => setMetadata(metadata),
      (err) => setError(err),
    )
  }, [])
  const loading = !error && (!avatarImage || !metadata)

  let frames: FrameMeta[] = useMemo(() => {
    if (!metadata) {
      return []
    }
    return Object.keys(metadata.frames).reduce<any>((acc, key, index) => {
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
  }, [metadata])

  return { image: avatarImage, frames, loading, error }
}

export default useAvatarTemplate
