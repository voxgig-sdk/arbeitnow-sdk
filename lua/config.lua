-- Arbeitnow SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Arbeitnow",
      slug = "arbeitnow",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://www.arbeitnow.com/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["job"] = {},
      },
    },
    entity = {
      ["job"] = {
        ["fields"] = {
          {
            ["name"] = "company_name",
            ["short"] = "Name of the hiring company",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "created_at",
            ["short"] = "Timestamp when the job was created",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "description",
            ["short"] = "Detailed job description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "job_types",
            ["short"] = "Type of employment (e.g., full-time, part-time, contract)",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "location",
            ["short"] = "Job location",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "remote",
            ["short"] = "Whether the job offers remote work",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "slug",
            ["short"] = "Unique identifier for the job posting",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tags",
            ["short"] = "Tags associated with the job (e.g., technologies, skills)",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "title",
            ["short"] = "Job title",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "url",
            ["short"] = "URL to the job posting",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "job",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "location",
                      ["orig"] = "location",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/job-board-api",
                ["segments"] = {
                  {
                    ["lit"] = "job-board-api",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "location",
                    "page",
                    "search",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "job-board-api",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
