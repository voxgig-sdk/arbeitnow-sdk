# frozen_string_literal: true

# Typed models for the Arbeitnow SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Job entity data model.
#
# @!attribute [rw] company_name
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] job_types
#   @return [Array, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] remote
#   @return [Boolean, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Job = Struct.new(
  :company_name,
  :created_at,
  :description,
  :job_types,
  :location,
  :remote,
  :slug,
  :tags,
  :title,
  :url,
  keyword_init: true
)

# Request payload for Job#list.
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
JobListMatch = Struct.new(
  :location,
  :page,
  :search,
  keyword_init: true
)

