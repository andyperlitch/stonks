import { errorHandler } from '../errorHandler'

describe('the errorHandler', () => {
  it('is a function', () => {
    expect(typeof errorHandler).toBe('function')
  })
  it('sucks', () => {
    expect('foo').toBe('bar')
  })
})
