# Arbeitnow SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Arbeitnow",
            "slug": "arbeitnow",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.arbeitnow.com/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "job": {},
            },
        },
        "entity": {
      "job": {
        "fields": [
          {
            "name": "company_name",
            "short": "Name of the hiring company",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "short": "Timestamp when the job was created",
            "type": "`$INTEGER`",
          },
          {
            "name": "description",
            "short": "Detailed job description",
            "type": "`$STRING`",
          },
          {
            "name": "job_types",
            "short": "Type of employment (e.g., full-time, part-time, contract)",
            "type": "`$ARRAY`",
          },
          {
            "name": "location",
            "short": "Job location",
            "type": "`$STRING`",
          },
          {
            "name": "remote",
            "short": "Whether the job offers remote work",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "slug",
            "short": "Unique identifier for the job posting",
            "type": "`$STRING`",
          },
          {
            "name": "tags",
            "short": "Tags associated with the job (e.g., technologies, skills)",
            "type": "`$ARRAY`",
          },
          {
            "name": "title",
            "short": "Job title",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "short": "URL to the job posting",
            "type": "`$STRING`",
          },
        ],
        "name": "job",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/job-board-api",
                "segments": [
                  {
                    "lit": "job-board-api",
                  },
                ],
                "select": {
                  "exist": [
                    "location",
                    "page",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "job-board-api",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
