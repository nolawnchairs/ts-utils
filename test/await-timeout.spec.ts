import { Futures } from '../src'

describe('tests the await with timeout function', () => {

  const longRunner = async () => {
    await Futures.wait(1000)
    return 'long'
  }
  const shortRunner = async () => {
    await Futures.wait(100)
    return 'short'
  }

  it('should change the value', async () => {
    await expect(Futures.awaitWithTimeout(500, shortRunner)).resolves.toEqual('short')
    await expect(Futures.awaitWithTimeout<string>(500, longRunner)).rejects.toThrowError()
  })
})
