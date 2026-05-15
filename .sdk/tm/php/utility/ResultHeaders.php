<?php
declare(strict_types=1);

// Arbeitnow SDK utility: result_headers

class ArbeitnowResultHeaders
{
    public static function call(ArbeitnowContext $ctx): ?ArbeitnowResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
