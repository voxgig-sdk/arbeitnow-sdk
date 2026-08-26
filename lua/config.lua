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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
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
                ["parts"] = {
                  "job-board-api",
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
