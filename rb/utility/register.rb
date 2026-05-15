# Arbeitnow SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ArbeitnowUtility.registrar = ->(u) {
  u.clean = ArbeitnowUtilities::Clean
  u.done = ArbeitnowUtilities::Done
  u.make_error = ArbeitnowUtilities::MakeError
  u.feature_add = ArbeitnowUtilities::FeatureAdd
  u.feature_hook = ArbeitnowUtilities::FeatureHook
  u.feature_init = ArbeitnowUtilities::FeatureInit
  u.fetcher = ArbeitnowUtilities::Fetcher
  u.make_fetch_def = ArbeitnowUtilities::MakeFetchDef
  u.make_context = ArbeitnowUtilities::MakeContext
  u.make_options = ArbeitnowUtilities::MakeOptions
  u.make_request = ArbeitnowUtilities::MakeRequest
  u.make_response = ArbeitnowUtilities::MakeResponse
  u.make_result = ArbeitnowUtilities::MakeResult
  u.make_point = ArbeitnowUtilities::MakePoint
  u.make_spec = ArbeitnowUtilities::MakeSpec
  u.make_url = ArbeitnowUtilities::MakeUrl
  u.param = ArbeitnowUtilities::Param
  u.prepare_auth = ArbeitnowUtilities::PrepareAuth
  u.prepare_body = ArbeitnowUtilities::PrepareBody
  u.prepare_headers = ArbeitnowUtilities::PrepareHeaders
  u.prepare_method = ArbeitnowUtilities::PrepareMethod
  u.prepare_params = ArbeitnowUtilities::PrepareParams
  u.prepare_path = ArbeitnowUtilities::PreparePath
  u.prepare_query = ArbeitnowUtilities::PrepareQuery
  u.result_basic = ArbeitnowUtilities::ResultBasic
  u.result_body = ArbeitnowUtilities::ResultBody
  u.result_headers = ArbeitnowUtilities::ResultHeaders
  u.transform_request = ArbeitnowUtilities::TransformRequest
  u.transform_response = ArbeitnowUtilities::TransformResponse
}
