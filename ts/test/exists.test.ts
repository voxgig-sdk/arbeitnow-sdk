
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ArbeitnowSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ArbeitnowSDK.test()
    equal(testsdk instanceof ArbeitnowSDK, true,
      'ArbeitnowSDK.test() must return a client synchronously')
  })

})
