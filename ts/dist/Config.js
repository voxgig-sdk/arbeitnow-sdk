"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Arbeitnow',
        slug: "arbeitnow",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://www.arbeitnow.com/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            job: {},
        }
    };
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
                    "format": "uri",
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
                            "segments": [
                                {
                                    "lit": "job-board-api"
                                }
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
                            },
                            "parts": [
                                "job-board-api"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map