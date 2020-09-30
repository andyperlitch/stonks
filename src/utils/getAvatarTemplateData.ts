import { promises as fs } from 'fs'
import { resolve } from 'path'
import { AsepriteFile } from '../types/aseprite'

export async function getAvatarTemplateData() {
  const fileContent = await fs.readFile(
    resolve(__dirname, '../../artwork/avatar.json'),
    'utf-8',
  )
  const metadata: AsepriteFile = JSON.parse(fileContent)
  return metadata
}
