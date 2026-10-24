"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "job",
        "accessor": "Job",
        "op": "list",
        "method": "GET",
        "path": "/job-board-api",
        "args": [],
        "select": {
            "location": "v1",
            "page": 1,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "location",
            "page"
        ],
        "queryArgs": [
            {
                "name": "location",
                "wire": "location"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "slug": "x",
                    "company_name": "x",
                    "title": "x",
                    "description": "x",
                    "remote": true,
                    "url": "x",
                    "tags": [
                        "x"
                    ],
                    "job_types": [
                        "x"
                    ],
                    "location": "x",
                    "created_at": 1
                }
            ],
            "links": {
                "first": "x",
                "last": "x",
                "prev": "x",
                "next": "x"
            },
            "meta": {
                "current_page": 1,
                "from": 1,
                "last_page": 1,
                "path": "x",
                "per_page": 1,
                "to": 1,
                "total": 1
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map