import { Objects } from '../src'

describe('tests the Objects namespace', () => {

  let object = {
    aString: 'string',
    anEmptyString: '',
    aNumber: 42,
    aZero: 0,
    aTrue: true,
    aFalse: false,
    anArray: [1, 2, 3],
    anEmptyArray: [],
    anObject: {
      foo: 'bar',
      baz: 'quux',
    },
    anEmptyObject: {},
    aNull: null,
    anUndefined: undefined,
  }

  it('should remove undefined properties', () => {
    const testCase = Objects.nonUndefined(object)
    expect(testCase).not.toHaveProperty('anUndefined')
    expect(testCase).toHaveProperty('aNull')
    expect(testCase).toHaveProperty('aZero')
    expect(testCase).toHaveProperty('aFalse')
  })

  it('should remove null and undefined properties', () => {
    const testCase = Objects.nonNull(object)
    expect(testCase).not.toHaveProperty('anUndefined')
    expect(testCase).not.toHaveProperty('aNull')
    expect(testCase).toHaveProperty('aZero')
    expect(testCase).toHaveProperty('aFalse')
  })

  it('should remove all falsey properties', () => {
    const testCase = Objects.truthy(object)
    expect(testCase).not.toHaveProperty('anUndefined')
    expect(testCase).not.toHaveProperty('aNull')
    expect(testCase).not.toHaveProperty('aFalse')
    expect(testCase).not.toHaveProperty('aZero')
    expect(testCase).not.toHaveProperty('anEmptyString')
  })

  it('should remove all empty strings only', () => {
    const testCase = Objects.nonEmptyStrings(object)
    expect(testCase).not.toHaveProperty('anEmptyString')
    expect(testCase).toHaveProperty('anUndefined')
    expect(testCase).toHaveProperty('aNull')
    expect(testCase).toHaveProperty('aFalse')
    expect(testCase).toHaveProperty('aZero')
  })

  it('should remove all specified properties', () => {
    const testCase = Objects.drop(object, 'aFalse', 'anArray', 'anEmptyString')
    expect(testCase).not.toHaveProperty('aFalse')
    expect(testCase).not.toHaveProperty('anArray')
    expect(testCase).not.toHaveProperty('anEmptyString')
    expect(testCase).toHaveProperty('aTrue')
    expect(testCase).toHaveProperty('aZero')
    expect(testCase).toHaveProperty('aString')
    expect(testCase).toHaveProperty('aNumber')
  })

  it('should map a function to each property', () => {
    const object = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5
    }
    const testCase = Objects.mapEntries(object, (k, v) => v * 2)
    expect(testCase.one).toEqual(2)
    expect(testCase.two).toEqual(4)
    expect(testCase.three).toEqual(6)
    expect(testCase.four).toEqual(8)
    expect(testCase.five).toEqual(10)
  })
})
