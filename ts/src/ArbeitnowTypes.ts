// Typed models for the Arbeitnow SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Job {
  company_name?: string
  created_at?: number
  description?: string
  job_type?: any[]
  location?: string
  remote?: boolean
  slug?: string
  tag?: any[]
  title?: string
  url?: string
}

export interface JobListMatch {
  company_name?: string
  created_at?: number
  description?: string
  job_type?: any[]
  location?: string
  remote?: boolean
  slug?: string
  tag?: any[]
  title?: string
  url?: string
}

