import React, { useMemo, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import useAvatarTemplate, { FrameMeta } from '../hooks/useAvatarTemplate'
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
    [key in AvatarComponent]: AvatarComponentMeta
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
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const MyAvatar = () => {
  const classes = useStyles()
  const cnvRef = useRef<HTMLCanvasElement>(null)
  const { image, templateMeta /* , error, loading */ } = useAvatarTemplate()

  const [avatar] = useState<AvatarMetadata>(DEFAULT_AVATAR_META)
  const [animationName] = useState('blink')
  const [sliceName, setSliceName] = useState('southwest')
  const [frameNumber] = useState(0)

  const frames = useMemo(() => {
    let frames: FrameMeta[] = []
    if (avatar && templateMeta && image) {
      frames = Object.keys(avatar.components)
        .reduce<FrameMeta[]>((acc, componentType) => {
          const componentMeta =
            avatar.components[componentType as AvatarComponent]

          const f =
            templateMeta[componentType][componentMeta.name][sliceName][
              animationName
            ]
          acc.push(...f)
          return acc
        }, [])
        .filter((f) => f.frameNumber === frameNumber)
        .sort((f1, f2) => f1.index - f2.index)
    }
    return frames
  }, [animationName, sliceName, avatar, templateMeta, image, frameNumber])

  console.log(`frames`, frames)

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

  return (
    <ToolbarPage>
      <h1 className={classes.title}>My Avatar</h1>
      <div className={classes.stage}>
        <canvas ref={cnvRef} width={24 * MULTIPLIER} height={36 * MULTIPLIER} />
      </div>
      <div>
        <button onClick={() => setSliceName('north')}>north</button>
        <button onClick={() => setSliceName('northwest')}>northwest</button>
        <button onClick={() => setSliceName('west')}>west</button>
        <button onClick={() => setSliceName('southwest')}>southwest</button>
        <button onClick={() => setSliceName('south')}>south</button>
        <button onClick={() => setSliceName('southeast')}>southeast</button>
        <button onClick={() => setSliceName('east')}>east</button>
        <button onClick={() => setSliceName('northeast')}>northeast</button>
      </div>
    </ToolbarPage>
  )
}
