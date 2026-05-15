<?php
declare(strict_types=1);

// Arbeitnow SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ArbeitnowMakeContext
{
    public static function call(array $ctxmap, ?ArbeitnowContext $basectx): ArbeitnowContext
    {
        return new ArbeitnowContext($ctxmap, $basectx);
    }
}
