import { Bind, Futures } from '../src'

class Test {

  private _value = ''

  get value() {
    return this._value
  }

  @Bind()
  changeValue() {
    this._value = 'Passed'
  }
}

describe('tests the @Bind decorator', () => {

  const test = new Test()
  it('should change the value', async () => {
    await Futures.delayed(10, test.changeValue)
    expect(test.value).toEqual('Passed')
  })
})
