import { generateRandomAvatarComponents } from '../generateRandomAvatarComponents'

describe('generateRandomAvatarComponents', () => {
  it('generates a set of random components based on the avatar template file', async () => {
    // since its random, we want tomake sure everything works
    for (let i = 0; i < 50; i++) {
      const components = await generateRandomAvatarComponents()
      const types = new Set(components.map((c) => c.type))
      expect(Array.from(types).sort()).toEqual([
        'bottom',
        'brows',
        'eyes',
        'hair',
        'mouth',
        'skin',
        'top',
      ])
    }
  })
})
