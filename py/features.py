# Arbeitnow SDK feature factory

from feature.base_feature import ArbeitnowBaseFeature
from feature.test_feature import ArbeitnowTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ArbeitnowBaseFeature(),
        "test": lambda: ArbeitnowTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
