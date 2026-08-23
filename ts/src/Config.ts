
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      }
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
          "short": "Name of the hiring company",
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "short": "Timestamp when the job was created",
          "type": "`$INTEGER`"
        },
        {
          "name": "description",
          "short": "Detailed job description",
          "type": "`$STRING`"
        },
        {
          "name": "job_types",
          "short": "Type of employment (e.g., full-time, part-time, contract)",
          "type": "`$ARRAY`"
        },
        {
          "name": "location",
          "short": "Job location",
          "type": "`$STRING`"
        },
        {
          "name": "remote",
          "short": "Whether the job offers remote work",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "slug",
          "short": "Unique identifier for the job posting",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "Tags associated with the job (e.g., technologies, skills)",
          "type": "`$ARRAY`"
        },
        {
          "name": "title",
          "short": "Job title",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "URL to the job posting",
          "type": "`$STRING`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/job-board-api",
              "parts": [
                "job-board-api"
              ],
              "select": {
                "exist": [
                  "location",
                  "page",
                  "search"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
  config
}

