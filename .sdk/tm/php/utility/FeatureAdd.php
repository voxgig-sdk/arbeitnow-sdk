<?php
declare(strict_types=1);

// Arbeitnow SDK utility: feature_add

class ArbeitnowFeatureAdd
{
    public static function call(ArbeitnowContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
