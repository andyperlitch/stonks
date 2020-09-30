import React, { useMemo, useRef, useState } from 'react'
import { FetchAvatars_myAvatars } from '../avatar/types/FetchAvatars'
import useAvatarTemplate from '../avatar/useAvatarTemplate'

const AVATAR_WIDTH = 24
const AVATAR_HEIGHT = 36

interface AvatarPreviewProps {
  avatar: FetchAvatars_myAvatars
  multiplier: number
  className?: string
}

export const AvatarPreview = ({
  avatar,
  multiplier,
  className,
}: AvatarPreviewProps) => {
  const cnvRef = useRef<HTMLCanvasElement>(null)
  const {
    image,
    frames: allFrames /* , error, loading */,
  } = useAvatarTemplate()

  const [animationName] = useState('blink')
  const [sliceName] = useState('southwest')
  const [frameNumber] = useState(0)

  const frames = useMemo(() => {
    let frames: any[] = []
    console.log(`avatar`, avatar)
    if (avatar && allFrames?.length && image) {
      frames = allFrames
        .filter((f: any) =>
          avatar.components.some(
            (c) => f.partType === c.type && f.partName === c.optionId,
          ),
        )
        .filter((f: any) => f.sliceName === sliceName)
        .filter((f: any) => f.animationName === animationName)
        .filter((f: any) => f.frameNumber === frameNumber)
        .sort((f1: any, f2: any) => f1.index - f2.index)
    }
    return frames
  }, [animationName, sliceName, avatar, image, frameNumber, allFrames])

  if (cnvRef.current && frames?.length) {
    const ctx = cnvRef.current?.getContext('2d')
    if (ctx && image) {
      ctx.clearRect(0, 0, AVATAR_WIDTH * multiplier, AVATAR_HEIGHT * multiplier)
      ctx.imageSmoothingEnabled = false
      frames.forEach((f) => {
        if (f.flipped) {
          ctx.save()
          ctx.scale(-1, 1)
        }
        ctx?.drawImage(
          image,
          f.coordinates.x + (f.flipped ? AVATAR_WIDTH : 0),
          f.coordinates.y,
          f.coordinates.w * (f.flipped ? -1 : 1),
          f.coordinates.h,
          0,
          0,
          f.coordinates.w * multiplier * (f.flipped ? -1 : 1),
          f.coordinates.h * multiplier,
        )
        if (f.flipped) {
          ctx.restore()
        }
      })
    }
  }

  return (
    <canvas
      className={className}
      ref={cnvRef}
      width={multiplier * AVATAR_WIDTH}
      height={multiplier * AVATAR_HEIGHT}
    ></canvas>
  )
}
