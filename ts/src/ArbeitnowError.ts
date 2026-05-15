
import { Context } from './Context'


class ArbeitnowError extends Error {

  isArbeitnowError = true

  sdk = 'Arbeitnow'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ArbeitnowError
}

