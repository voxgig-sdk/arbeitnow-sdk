<?php
declare(strict_types=1);

// Typed models for the Arbeitnow SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Job entity data model. */
class Job
{
    public ?string $company_name = null;
    public ?int $created_at = null;
    public ?string $description = null;
    public ?array $job_types = null;
    public ?string $location = null;
    public ?bool $remote = null;
    public ?string $slug = null;
    public ?array $tags = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Request payload for Job#list. */
class JobListMatch
{
    public ?string $company_name = null;
    public ?int $created_at = null;
    public ?string $description = null;
    public ?array $job_types = null;
    public ?string $location = null;
    public ?bool $remote = null;
    public ?string $slug = null;
    public ?array $tags = null;
    public ?string $title = null;
    public ?string $url = null;
}

