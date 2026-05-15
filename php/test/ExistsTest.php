<?php
declare(strict_types=1);

// Arbeitnow SDK exists test

require_once __DIR__ . '/../arbeitnow_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ArbeitnowSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
