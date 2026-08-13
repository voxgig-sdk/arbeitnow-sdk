# Arbeitnow SDK exists test

import pytest
from arbeitnow_sdk import ArbeitnowSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ArbeitnowSDK.test(None, None)
        assert testsdk is not None
