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
            ["title"] = "Company Name",
            ["type"] = "`$STRING`",
            ["short"] = "Name of the hiring company",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$INTEGER`",
            ["short"] = "Timestamp when the job was created",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "Detailed job description",
          },
          {
            ["name"] = "job_types",
            ["title"] = "Job Types",
            ["type"] = "`$ARRAY`",
            ["short"] = "Type of employment (e.g., full-time, part-time, contract)",
          },
          {
            ["name"] = "location",
            ["title"] = "Location",
            ["type"] = "`$STRING`",
            ["short"] = "Job location",
          },
          {
            ["name"] = "remote",
            ["title"] = "Remote",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether the job offers remote work",
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the job posting",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
            ["short"] = "Tags associated with the job (e.g., technologies, skills)",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["short"] = "Job title",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL to the job posting",
            ["format"] = "uri",
          },
        },
        ["name"] = "job",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/job-board-api",
                ["segments"] = {
                  {
                    ["lit"] = "job-board-api",
                  },
                },
                ["parts"] = {
                  "job-board-api",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "location",
                      ["orig"] = "location",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "location",
                    "page",
                    "search",
                  },
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
