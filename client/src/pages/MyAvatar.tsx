import { IonSlide, IonSlides } from '@ionic/react'
import React, { useMemo, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import useAvatarTemplate from '../avatar/useAvatarTemplate'
import { ToolbarPage } from './ToolbarPage'

const MULTIPLIER = 10
interface AvatarComponentMeta {
  name: string
  hue: number
  saturation: number
  lightness: number
  contrast: number
}

type AvatarComponent =
  | 'skin'
  | 'top'
  | 'mouth'
  | 'hair'
  | 'eyes'
  | 'brows'
  | 'bottom'

interface AvatarMetadata {
  components: {
    [key: string]: AvatarComponentMeta
  }
}

const DEFAULT_COMPONENT_META = {
  hue: 0,
  saturation: 0,
  lightness: 0,
  contrast: 0,
}

const DEFAULT_AVATAR_META: AvatarMetadata = {
  components: {
    skin: {
      name: 'avg',
      ...DEFAULT_COMPONENT_META,
    },
    top: {
      name: 'baseball',
      ...DEFAULT_COMPONENT_META,
    },
    mouth: {
      name: 'small',
      ...DEFAULT_COMPONENT_META,
    },
    hair: {
      name: 'short',
      ...DEFAULT_COMPONENT_META,
    },
    eyes: {
      name: 'small',
      ...DEFAULT_COMPONENT_META,
    },
    brows: {
      name: 'avg',
      ...DEFAULT_COMPONENT_META,
    },
    bottom: {
      name: 'pants',
      ...DEFAULT_COMPONENT_META,
    },
  },
}

const useStyles = createUseStyles({
  title: {
    textAlign: 'center',
  },
  stage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const MyAvatar = () => {
  const classes = useStyles()
  const cnvRef = useRef<HTMLCanvasElement>(null)
  const slidesRef = useRef(null)
  const {
    image,
    frames: allFrames /* , error, loading */,
  } = useAvatarTemplate()

  const [avatar] = useState<AvatarMetadata>(DEFAULT_AVATAR_META)
  const [animationName] = useState('blink')
  const [sliceName] = useState('southwest')
  const [frameNumber] = useState(0)

  const frames = useMemo(() => {
    let frames: any[] = []
    if (avatar && allFrames?.length && image) {
      frames = allFrames
        .filter((f: any) =>
          Object.keys(avatar.components).some(
            (cKey) =>
              f.partType === cKey &&
              f.partName === avatar.components[cKey].name,
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
      ctx.clearRect(0, 0, 24 * MULTIPLIER, 36 * MULTIPLIER)
      ctx.imageSmoothingEnabled = false
      frames.forEach((f) => {
        if (f.flipped) {
          ctx.save()
          ctx.scale(-1, 1)
        }
        ctx?.drawImage(
          image,
          f.coordinates.x + (f.flipped ? 24 : 0),
          f.coordinates.y,
          f.coordinates.w * (f.flipped ? -1 : 1),
          f.coordinates.h,
          0,
          0,
          f.coordinates.w * MULTIPLIER * (f.flipped ? -1 : 1),
          f.coordinates.h * MULTIPLIER,
        )
        if (f.flipped) {
          ctx.restore()
        }
      })
    }
  }

  const slideOpts = {
    initialSlide: 0,
    autoplay: false,
  }

  return (
    <ToolbarPage>
      <h1 className={classes.title}>My Avatar</h1>
      <IonSlides ref={slidesRef} options={slideOpts}>
        <IonSlide>
          <div className={classes.stage}>
            <canvas
              ref={cnvRef}
              width={24 * MULTIPLIER}
              height={36 * MULTIPLIER}
            />
          </div>
        </IonSlide>
        <IonSlide>Slide 2</IonSlide>
        <IonSlide>Slide 3</IonSlide>
        <IonSlide>Slide 4</IonSlide>
        <IonSlide>Slide 5</IonSlide>
      </IonSlides>
    </ToolbarPage>
  )
}
