-- Arbeitnow SDK error

local ArbeitnowError = {}
ArbeitnowError.__index = ArbeitnowError


function ArbeitnowError.new(code, msg, ctx)
  local self = setmetatable({}, ArbeitnowError)
  self.is_sdk_error = true
  self.sdk = "Arbeitnow"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ArbeitnowError:error()
  return self.msg
end


function ArbeitnowError:__tostring()
  return self.msg
end


return ArbeitnowError
