# Arbeitnow SDK feature factory

from arbeitnow_sdk.feature.base_feature import ArbeitnowBaseFeature
from arbeitnow_sdk.feature.ratelimit_feature import ArbeitnowRatelimitFeature
from arbeitnow_sdk.feature.retry_feature import ArbeitnowRetryFeature
from arbeitnow_sdk.feature.test_feature import ArbeitnowTestFeature
from arbeitnow_sdk.feature.timeout_feature import ArbeitnowTimeoutFeature


_FEATURES = {
    "base": lambda: ArbeitnowBaseFeature(),
    "ratelimit": lambda: ArbeitnowRatelimitFeature(),
    "retry": lambda: ArbeitnowRetryFeature(),
    "test": lambda: ArbeitnowTestFeature(),
    "timeout": lambda: ArbeitnowTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
