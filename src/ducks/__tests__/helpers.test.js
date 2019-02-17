import { getQueryParam } from "../helpers"

describe('getQueryParam functional tests ', () => {
  beforeEach(() => {
   
  })

  test('getQueryParam functional tests', () => {
    const result = getQueryParam('jana', 'https://jestjs.io/docs/en/?jana=jana')
    expect(result).toBe('jana')
  })
  test('getQueryParam functional tests', () => {
    const result = getQueryParam('jana', 'https://jestjs.io/docs/en/?jana="jana"')
    expect(result).toBe('"jana"')
  })
  test('getQueryParam functional tests', () => {
    const result = getQueryParam('venky', 'https://jestjs.io/docs/en/?jana=jana&venky=9805')
    expect(result).toBe('9805')
  })
})