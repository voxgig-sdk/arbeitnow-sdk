# Arbeitnow SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ArbeitnowFeatures
  def self.make_feature(name)
    case name
    when "base"
      ArbeitnowBaseFeature.new
    when "ratelimit"
      ArbeitnowRatelimitFeature.new
    when "retry"
      ArbeitnowRetryFeature.new
    when "test"
      ArbeitnowTestFeature.new
    when "timeout"
      ArbeitnowTimeoutFeature.new
    else
      ArbeitnowBaseFeature.new
    end
  end
end
