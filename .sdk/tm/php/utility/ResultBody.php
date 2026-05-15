<?php
declare(strict_types=1);

// Arbeitnow SDK utility: result_body

class ArbeitnowResultBody
{
    public static function call(ArbeitnowContext $ctx): ?ArbeitnowResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
