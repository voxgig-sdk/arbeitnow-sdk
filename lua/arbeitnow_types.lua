-- Typed models for the Arbeitnow SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Job
---@field company_name? string
---@field created_at? number
---@field description? string
---@field job_type? table
---@field location? string
---@field remote? boolean
---@field slug? string
---@field tag? table
---@field title? string
---@field url? string

---@class JobListMatch
---@field company_name? string
---@field created_at? number
---@field description? string
---@field job_type? table
---@field location? string
---@field remote? boolean
---@field slug? string
---@field tag? table
---@field title? string
---@field url? string

local M = {}

return M
