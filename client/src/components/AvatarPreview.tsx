import React, { useMemo, useRef, useState } from 'react'
import { FetchAvatars_myAvatars_components } from '../avatar/types/FetchAvatars'
import { GetAvatarTemplate_avatarTemplate_frames } from '../avatar/types/getAvatarTemplate'
import useAvatarTemplate from '../avatar/useAvatarTemplate'
import { Avatar } from '../pages/EditAvatar/types'

const AVATAR_WIDTH = 24
const AVATAR_HEIGHT = 36

interface AvatarPreviewProps {
  avatar: Avatar
  multiplier: number
  className?: string
}

interface FrameWithComponent extends GetAvatarTemplate_avatarTemplate_frames {
  component?: FetchAvatars_myAvatars_components
}

// const applyContrast = (ctx: CanvasRenderingContext2D, contrast: number) => {
//   let imageData = ctx.getImageData(0, 0, AVATAR_WIDTH, AVATAR_HEIGHT)
//   const d = imageData.data
//   contrast = contrast / 100 + 1 //convert to decimal & shift range: [0..2]
//   const intercept = 128 * (1 - contrast)
//   for (let i = 0; i < d.length; i += 4) {
//     //r,g,b,a
//     d[i] = d[i] * contrast + intercept
//     d[i + 1] = d[i + 1] * contrast + intercept
//     d[i + 2] = d[i + 2] * contrast + intercept
//   }
//   ctx.clearRect(0, 0, AVATAR_WIDTH, AVATAR_HEIGHT)
//   ctx.putImageData(imageData, 0, 0)
// }

const applyEffect = (
  filterFn: (value: number) => string,
  defaultValue: number,
) => (ctx: CanvasRenderingContext2D, value: number = defaultValue) => {
  let imageData = ctx.getImageData(0, 0, AVATAR_WIDTH, AVATAR_HEIGHT)
  ctx.clearRect(0, 0, AVATAR_WIDTH, AVATAR_HEIGHT)
  ctx.filter = filterFn(value)

  let offscreen = document.createElement('canvas')
  offscreen.width = AVATAR_WIDTH
  offscreen.height = AVATAR_HEIGHT
  let offscreenCtx = offscreen.getContext('2d')
  offscreenCtx?.putImageData(imageData, 0, 0)

  ctx.drawImage(offscreen, 0, 0)
}

const applyHueShift = applyEffect((hueShift) => `hue-rotate(${hueShift}deg)`, 0)
const applySaturation = applyEffect(
  (saturation) => `saturate(${saturation}%)`,
  100,
)
const applyContrast = applyEffect((contrast) => `contrast(${contrast}%)`, 100)
const applyLightness = applyEffect(
  (lightness) => `brightness(${lightness}%)`,
  100,
)

const renderFrameWithComponent = (
  { component, ...frame }: FrameWithComponent,
  image: HTMLImageElement,
) => {
  let canvas = document.createElement('canvas')
  canvas.width = AVATAR_WIDTH
  canvas.height = AVATAR_HEIGHT

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get context from new canvas element')
  }

  ctx.drawImage(
    image,
    frame.coordinates.x,
    frame.coordinates.y,
    frame.coordinates.w,
    frame.coordinates.h,
    0,
    0,
    frame.coordinates.w,
    frame.coordinates.h,
  )

  applyContrast(ctx, component?.contrast)
  applyHueShift(ctx, component?.hue)
  applySaturation(ctx, component?.saturation)
  applyLightness(ctx, component?.lightness)

  return canvas
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
    let frames: FrameWithComponent[] = []
    if (avatar && allFrames?.length && image) {
      frames = allFrames
        // get associated frames, and mix in the component itself for rendering below
        .reduce((acc, f) => {
          const component = avatar.components.find(
            (c) => f.partType === c.type && f.partName === c.optionId,
          )
          if (component) {
            acc.push({
              ...f,
              component,
            })
          }
          return acc
        }, [] as FrameWithComponent[])
        .filter((f) => f.sliceName === sliceName)
        .filter((f) => f.animationName === animationName)
        .filter((f) => f.frameNumber === frameNumber)
        .sort((f1, f2) => f1.index - f2.index)
    }
    return frames
  }, [animationName, sliceName, avatar, image, frameNumber, allFrames])

  if (cnvRef.current && frames?.length) {
    const ctx = cnvRef.current?.getContext('2d')
    if (ctx && image) {
      ctx.clearRect(0, 0, AVATAR_WIDTH * multiplier, AVATAR_HEIGHT * multiplier)
      ctx.imageSmoothingEnabled = false
      frames.forEach((f) => {
        // to debug specific frames:
        // if (f.partType === 'skin' && f.subPartName === 'head') {
        //   console.log('frame', f)
        // }
        const adjustedImage = renderFrameWithComponent(f, image)

        ctx?.drawImage(
          adjustedImage,
          0,
          0,
          AVATAR_WIDTH,
          AVATAR_HEIGHT,
          0,
          0,
          f.coordinates.w * multiplier,
          f.coordinates.h * multiplier,
        )
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
