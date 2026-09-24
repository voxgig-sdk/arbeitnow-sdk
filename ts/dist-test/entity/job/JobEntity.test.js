"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('JobEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ARBEITNOW_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ARBEITNOW_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ArbeitnowSDK.test();
        const ent = testsdk.Job();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ARBEITNOW_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'job.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "company_name": { "a": true, "h": "Company Name", "n": "company_name", "r": false, "sh": "Name of the hiring company", "t": "`$STRING`", "key$": "company_name", "index$": 0 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "sh": "Timestamp when the job was created", "t": "`$INTEGER`", "key$": "created_at", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Detailed job description", "t": "`$STRING`", "key$": "description", "index$": 2 }, "job_types": { "a": true, "h": "Job Types", "n": "job_types", "r": false, "sh": "Type of employment (e.g., full-time, part-time, contract)", "t": "`$ARRAY`", "key$": "job_types", "index$": 3 }, "location": { "a": true, "h": "Location", "n": "location", "r": false, "sh": "Job location", "t": "`$STRING`", "key$": "location", "index$": 4 }, "remote": { "a": true, "h": "Remote", "n": "remote", "r": false, "sh": "Whether the job offers remote work", "t": "`$BOOLEAN`", "key$": "remote", "index$": 5 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": false, "sh": "Unique identifier for the job posting", "t": "`$STRING`", "key$": "slug", "index$": 6 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Tags associated with the job (e.g., technologies, skills)", "t": "`$ARRAY`", "key$": "tags", "index$": 7 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "Job title", "t": "`$STRING`", "key$": "title", "index$": 8 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "sh": "URL to the job posting", "t": "`$STRING`", "key$": "url", "index$": 9 } }, "name": "job", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /job-board-api", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "location", "or": "location", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/job-board-api", "q": { "exist": ["location", "page", "search"] }, "r": {}, "s": [{ "lit": "job-board-api" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "job", "name__orig": "job", "Name": "Job", "name_": "job", "name-": "job", "NAME": "JOB", "index$": 0 }, { "active": true, "entity": "job", "key$": "BasicJobFlow", "kind": "basic", "name": "BasicJobFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "job_ref01" } }], "index$": 0 }] }, 'Job', { "GET /job-board-api": { "protocol": "http", "operationId": "getJobListings", "responses": { "200": { "description": "Successful response with job listings", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "items": { "properties": { "company_name": { "description": "Name of the hiring company", "type": "string", "key$": "company_name" }, "created_at": { "description": "Timestamp when the job was created", "type": "integer", "key$": "created_at" }, "description": { "description": "Detailed job description", "type": "string", "key$": "description" }, "job_types": { "description": "Type of employment (e.g., full-time, part-time, contract)", "items": { "type": "string" }, "type": "array", "key$": "job_types" }, "location": { "description": "Job location", "type": "string", "key$": "location" }, "remote": { "description": "Whether the job offers remote work", "type": "boolean", "key$": "remote" }, "slug": { "description": "Unique identifier for the job posting", "type": "string", "key$": "slug" }, "tags": { "description": "Tags associated with the job (e.g., technologies, skills)", "items": { "type": "string" }, "type": "array", "key$": "tags" }, "title": { "description": "Job title", "type": "string", "key$": "title" }, "url": { "description": "URL to the job posting", "format": "uri", "type": "string", "key$": "url" } }, "type": "object", "index$": 0 }, "key$": "data", "type": "array" }, "links": { "key$": "links", "properties": { "first": { "description": "Link to the first page", "format": "uri", "type": "string" }, "last": { "description": "Link to the last page", "format": "uri", "type": "string" }, "next": { "description": "Link to the next page", "format": "uri", "nullable": true, "type": "string" }, "prev": { "description": "Link to the previous page", "format": "uri", "nullable": true, "type": "string" } }, "type": "object" }, "meta": { "key$": "meta", "properties": { "current_page": { "description": "Current page number", "type": "integer" }, "from": { "description": "Starting item number on current page", "type": "integer" }, "last_page": { "description": "Total number of pages", "type": "integer" }, "path": { "description": "Base path of the API endpoint", "type": "string" }, "per_page": { "description": "Number of items per page", "type": "integer" }, "to": { "description": "Ending item number on current page", "type": "integer" }, "total": { "description": "Total number of items", "type": "integer" } }, "type": "object" } } } } } }, "400": { "description": "Bad request - Invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" } } } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" } } } } } } }, "parameters": [{ "name": "search", "in": "query", "description": "Search term to filter jobs by title, company name, or description", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "location", "in": "query", "description": "Filter jobs by location", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 2 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let job_ref01_data = Object.values(setup.data.existing.job)[0];
        // LIST
        const job_ref01_ent = client.Job();
        const job_ref01_match = {};
        const job_ref01_list = (await job_ref01_ent.list(job_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/job/JobTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ArbeitnowSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['job01', 'job02', 'job03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ARBEITNOW_TEST_JOB_ENTID': idmap,
        'ARBEITNOW_TEST_LIVE': 'FALSE',
        'ARBEITNOW_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ARBEITNOW_TEST_JOB_ENTID'];
    const live = 'TRUE' === env.ARBEITNOW_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ARBEITNOW_TEST_JOB_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ArbeitnowSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ARBEITNOW_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=JobEntity.test.js.map