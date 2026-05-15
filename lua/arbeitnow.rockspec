package = "voxgig-sdk-arbeitnow"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/arbeitnow-sdk.git"
}
description = {
  summary = "Arbeitnow SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["arbeitnow_sdk"] = "arbeitnow_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
