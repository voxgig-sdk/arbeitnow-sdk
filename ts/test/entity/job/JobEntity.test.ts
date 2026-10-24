

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ArbeitnowSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('JobEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ARBEITNOW_TEST_LIVE=TRUE.
  afterEach(liveDelay('ARBEITNOW_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ArbeitnowSDK.test()
    const ent = testsdk.Job()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('job hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ArbeitnowSDK.test(offline).Job().stream('list')) { }
    }, /offline/)

    for await (const _item of ArbeitnowSDK.test(offline).Job()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ArbeitnowSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Job().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ArbeitnowSDK.test().Job().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ArbeitnowSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Job().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Job().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ArbeitnowSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Job().list({"location":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ARBEITNOW_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'job.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"company_name":{"a":true,"h":"Company Name","n":"company_name","r":false,"sh":"Name of the hiring company","t":"`$STRING`","key$":"company_name","index$":0},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"sh":"Timestamp when the job was created","t":"`$INTEGER`","key$":"created_at","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Detailed job description","t":"`$STRING`","key$":"description","index$":2},"job_types":{"a":true,"h":"Job Types","n":"job_types","r":false,"sh":"Type of employment (e.g., full-time, part-time, contract)","t":"`$ARRAY`","key$":"job_types","index$":3},"location":{"a":true,"h":"Location","n":"location","r":false,"sh":"Job location","t":"`$STRING`","key$":"location","index$":4},"remote":{"a":true,"h":"Remote","n":"remote","r":false,"sh":"Whether the job offers remote work","t":"`$BOOLEAN`","key$":"remote","index$":5},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"Unique identifier for the job posting","t":"`$STRING`","key$":"slug","index$":6},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"Tags associated with the job (e.g., technologies, skills)","t":"`$ARRAY`","key$":"tags","index$":7},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Job title","t":"`$STRING`","key$":"title","index$":8},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL to the job posting","t":"`$STRING`","key$":"url","index$":9}},"name":"job","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /job-board-api","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"location","or":"location","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/job-board-api","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"job-board-api"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"job","name__orig":"job","Name":"Job","name_":"job","name-":"job","NAME":"JOB","index$":0}, {"active":true,"entity":"job","key$":"BasicJobFlow","kind":"basic","name":"BasicJobFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"job_ref01"}}],"index$":0}]}, 'Job', {"GET /job-board-api":{"protocol":"http","parameters":[{"name":"search","in":"query","description":"Search term to filter jobs by title, company name, or description","required":false,"schema":{"type":"string"},"index$":0},{"name":"location","in":"query","description":"Filter jobs by location","required":false,"schema":{"type":"string"},"index$":1},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let job_ref01_data = Object.values(setup.data.existing.job)[0] as any

    // LIST
    const job_ref01_ent = client.Job()
    const job_ref01_match: any = {}

    const job_ref01_list = (await job_ref01_ent.list(job_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/job/JobTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ArbeitnowSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['job01','job02','job03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ARBEITNOW_TEST_JOB_ENTID': idmap,
    'ARBEITNOW_TEST_LIVE': 'FALSE',
    'ARBEITNOW_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ARBEITNOW_TEST_JOB_ENTID']

  const live = 'TRUE' === env.ARBEITNOW_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ARBEITNOW_TEST_JOB_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ArbeitnowSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
