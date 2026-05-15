# Arbeitnow SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ArbeitnowFeatures
  def self.make_feature(name)
    case name
    when "base"
      ArbeitnowBaseFeature.new
    when "test"
      ArbeitnowTestFeature.new
    else
      ArbeitnowBaseFeature.new
    end
  end
end
