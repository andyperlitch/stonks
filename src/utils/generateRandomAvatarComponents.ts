import { SKIN_DEFAULTS } from './../consts/avatar-defaults'
import { AvatarComponent } from './../entity/Avatar'
import { getAvatarTemplateData } from './getAvatarTemplateData'

interface PartMeta {
  partType: string
  partIds: string[]
}

const getRandomItem = (items: any[]) => {
  return items[Math.floor(Math.random() * items.length)]
}

const getRandomInteger = ([min, max]: [number, number]) => {
  return Math.round(Math.random() * (max - min)) + min
}

/**
 * Given a part type (such as "skin" or "eyes"), returns an object with
 * color adjustment properties (`hue`,`saturation`,`lightness`,`contrast`).
 * @param type The type of the part for which to generate the random color
 */
const getRandomPartColorForType = (
  type: string,
): {
  hue: number
  saturation: number
  lightness: number
  contrast: number
  previewColor: string
} => {
  switch (type) {
    case 'skin': {
      return getRandomItem(SKIN_DEFAULTS)
    }
    default: {
      return {
        previewColor: '',
        hue: getRandomInteger([-180, 180]),
        saturation: getRandomInteger([0, 200]),
        lightness: getRandomInteger([0, 200]),
        contrast: getRandomInteger([0, 200]),
      }
    }
  }
}

export async function generateRandomAvatarComponents(): Promise<
  AvatarComponent[]
> {
  const templateMeta = await getAvatarTemplateData()
  const partsMeta: PartMeta[] = Object.keys(templateMeta.frames).reduce(
    (partTypes, key) => {
      const [, , layerName] = key.split(':')
      const [partType, partId] = layerName.split('.')
      let partTypeObject = partTypes.find((pt) => pt.partType === partType)
      if (!partTypeObject) {
        partTypeObject = {
          partType,
          partIds: [],
        }
        partTypes.push(partTypeObject)
      }
      if (!partTypeObject.partIds.includes(partId)) {
        partTypeObject.partIds.push(partId)
      }
      return partTypes
    },
    [] as PartMeta[],
  )
  return partsMeta.map((pt) => ({
    // e.g. "avg"
    optionId: getRandomItem(pt.partIds),
    // e.g. "skin"
    type: pt.partType,
    ...getRandomPartColorForType(pt.partType),
  }))
}
