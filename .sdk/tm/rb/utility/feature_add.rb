# Arbeitnow SDK utility: feature_add
module ArbeitnowUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
