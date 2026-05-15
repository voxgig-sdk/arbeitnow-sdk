<?php
declare(strict_types=1);

// Arbeitnow SDK utility: prepare_body

class ArbeitnowPrepareBody
{
    public static function call(ArbeitnowContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
