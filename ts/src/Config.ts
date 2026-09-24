
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Arbeitnow',
        slug: "arbeitnow",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://www.arbeitnow.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        job: {
        },
  
    }
  }


  entity = {
    "job": {
      "fields": [
        {
          "name": "company_name",
          "title": "Company Name",
          "type": "`$STRING`",
          "short": "Name of the hiring company"
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$INTEGER`",
          "short": "Timestamp when the job was created"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Detailed job description"
        },
        {
          "name": "job_types",
          "title": "Job Types",
          "type": "`$ARRAY`",
          "short": "Type of employment (e.g., full-time, part-time, contract)"
        },
        {
          "name": "location",
          "title": "Location",
          "type": "`$STRING`",
          "short": "Job location"
        },
        {
          "name": "remote",
          "title": "Remote",
          "type": "`$BOOLEAN`",
          "short": "Whether the job offers remote work"
        },
        {
          "name": "slug",
          "title": "Slug",
          "type": "`$STRING`",
          "short": "Unique identifier for the job posting"
        },
        {
          "name": "tags",
          "title": "Tags",
          "type": "`$ARRAY`",
          "short": "Tags associated with the job (e.g., technologies, skills)"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Job title"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "short": "URL to the job posting",
          "format": "uri"
        }
      ],
      "name": "job",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/job-board-api",
              "segments": [
                {
                  "lit": "job-board-api"
                }
              ],
              "parts": [
                "job-board-api"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "location",
                    "orig": "location",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "location",
                  "page",
                  "search"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

