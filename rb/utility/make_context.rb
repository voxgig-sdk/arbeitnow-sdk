# Arbeitnow SDK utility: make_context
require_relative '../core/context'
module ArbeitnowUtilities
  MakeContext = ->(ctxmap, basectx) {
    ArbeitnowContext.new(ctxmap, basectx)
  }
end
