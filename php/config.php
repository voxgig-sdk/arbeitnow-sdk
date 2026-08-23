<?php
declare(strict_types=1);

// Arbeitnow SDK configuration

class ArbeitnowConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Arbeitnow",
                "slug" => "arbeitnow",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://www.arbeitnow.com/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "job" => [],
                ],
            ],
            "entity" => [
        'job' => [
          'fields' => [
            [
              'name' => 'company_name',
              'short' => 'Name of the hiring company',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'created_at',
              'short' => 'Timestamp when the job was created',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'description',
              'short' => 'Detailed job description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'job_types',
              'short' => 'Type of employment (e.g., full-time, part-time, contract)',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'location',
              'short' => 'Job location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'remote',
              'short' => 'Whether the job offers remote work',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'slug',
              'short' => 'Unique identifier for the job posting',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tags',
              'short' => 'Tags associated with the job (e.g., technologies, skills)',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'title',
              'short' => 'Job title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the job posting',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'job',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'search',
                        'orig' => 'search',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/job-board-api',
                  'parts' => [
                    'job-board-api',
                  ],
                  'select' => [
                    'exist' => [
                      'location',
                      'page',
                      'search',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ArbeitnowFeatures::make_feature($name);
    }
}
