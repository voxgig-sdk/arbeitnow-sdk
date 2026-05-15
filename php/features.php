<?php
declare(strict_types=1);

// Arbeitnow SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ArbeitnowFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ArbeitnowBaseFeature();
            case "test":
                return new ArbeitnowTestFeature();
            default:
                return new ArbeitnowBaseFeature();
        }
    }
}
