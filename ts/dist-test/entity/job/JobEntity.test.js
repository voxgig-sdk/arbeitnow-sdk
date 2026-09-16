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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "company_name", "req": false, "short": "Name of the hiring company", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "created_at", "req": false, "short": "Timestamp when the job was created", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "description", "req": false, "short": "Detailed job description", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "job_types", "req": false, "short": "Type of employment (e.g., full-time, part-time, contract)", "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "location", "req": false, "short": "Job location", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "remote", "req": false, "short": "Whether the job offers remote work", "type": "`$BOOLEAN`", "index$": 5 }, { "active": true, "name": "slug", "req": false, "short": "Unique identifier for the job posting", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "tags", "req": false, "short": "Tags associated with the job (e.g., technologies, skills)", "type": "`$ARRAY`", "index$": 7 }, { "active": true, "name": "title", "req": false, "short": "Job title", "type": "`$STRING`", "index$": 8 }, { "active": true, "format": "uri", "name": "url", "req": false, "short": "URL to the job posting", "type": "`$STRING`", "index$": 9 }], "name": "job", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "location", "orig": "location", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "search", "orig": "search", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /job-board-api", "json": "{\"operationId\":\"getJobListings\",\"parameters\":[{\"description\":\"Search term to filter jobs by title, company name, or description\",\"in\":\"query\",\"name\":\"search\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter jobs by location\",\"in\":\"query\",\"name\":\"location\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"company_name\":{\"description\":\"Name of the hiring company\",\"type\":\"string\"},\"created_at\":{\"description\":\"Timestamp when the job was created\",\"type\":\"integer\"},\"description\":{\"description\":\"Detailed job description\",\"type\":\"string\"},\"job_types\":{\"description\":\"Type of employment (e.g., full-time, part-time, contract)\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"location\":{\"description\":\"Job location\",\"type\":\"string\"},\"remote\":{\"description\":\"Whether the job offers remote work\",\"type\":\"boolean\"},\"slug\":{\"description\":\"Unique identifier for the job posting\",\"type\":\"string\"},\"tags\":{\"description\":\"Tags associated with the job (e.g., technologies, skills)\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"Job title\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the job posting\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"properties\":{\"first\":{\"description\":\"Link to the first page\",\"format\":\"uri\",\"type\":\"string\"},\"last\":{\"description\":\"Link to the last page\",\"format\":\"uri\",\"type\":\"string\"},\"next\":{\"description\":\"Link to the next page\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"prev\":{\"description\":\"Link to the previous page\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"meta\":{\"properties\":{\"current_page\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"from\":{\"description\":\"Starting item number on current page\",\"type\":\"integer\"},\"last_page\":{\"description\":\"Total number of pages\",\"type\":\"integer\"},\"path\":{\"description\":\"Base path of the API endpoint\",\"type\":\"string\"},\"per_page\":{\"description\":\"Number of items per page\",\"type\":\"integer\"},\"to\":{\"description\":\"Ending item number on current page\",\"type\":\"integer\"},\"total\":{\"description\":\"Total number of items\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with job listings\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/job-board-api", "segments": [{ "lit": "job-board-api" }], "select": { "exist": ["location", "page", "search"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "job", "name__orig": "job", "Name": "Job", "name_": "job", "name-": "job", "NAME": "JOB", "index$": 0 }, { "active": true, "entity": "job", "key$": "BasicJobFlow", "kind": "basic", "name": "BasicJobFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "job_ref01" } }], "index$": 0 }] }, 'Job');
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