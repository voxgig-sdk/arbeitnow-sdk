
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ArbeitnowSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ArbeitnowSDK.test()
    equal(null !== testsdk, true)
  })

})
