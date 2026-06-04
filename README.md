# Arbeitnow SDK

Browse English-speaking job listings across Germany with visa sponsorship, remote, and four-day-week filters

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Arbeitnow

[Arbeitnow](https://www.arbeitnow.com/) is a Berlin-based job board focused on opportunities in Germany and Europe that don't require German-language skills. The site highlights roles offering visa sponsorship, remote work, and four-day work weeks, and exposes the same listings through a public Job Board API.

What you get from the API:

- A feed of currently open job postings aggregated by Arbeitnow
- Listings annotated with tags such as visa sponsorship, remote, and four-day-week
- Company, location, and posting metadata suitable for building job boards, aggregators, or analytics

The API is served from `https://www.arbeitnow.com/api` and the primary route documented is `GET /api/job-board-api`. CORS is enabled and no authentication key is advertised for the public board endpoint, so it can be consumed directly from browser and server clients alike.

## Try it

**TypeScript**
```bash
npm install arbeitnow
```

**Python**
```bash
pip install arbeitnow-sdk
```

**PHP**
```bash
composer require voxgig/arbeitnow-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/arbeitnow-sdk/go
```

**Ruby**
```bash
gem install arbeitnow-sdk
```

**Lua**
```bash
luarocks install arbeitnow-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ArbeitnowSDK } from 'arbeitnow'

const client = new ArbeitnowSDK({})

// List all jobs
const jobs = await client.Job().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o arbeitnow-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "arbeitnow": {
      "command": "/abs/path/to/arbeitnow-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Job** | An open job posting from the Arbeitnow board, fetched via `GET /api/job-board-api`, typically including title, company, location, tags (visa, remote, four-day-week), and a link back to the listing. | `/job-board-api` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from arbeitnow_sdk import ArbeitnowSDK

client = ArbeitnowSDK({})

# List all jobs
jobs, err = client.Job(None).list(None, None)
```

### PHP

```php
<?php
require_once 'arbeitnow_sdk.php';

$client = new ArbeitnowSDK([]);

// List all jobs
[$jobs, $err] = $client->Job(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/arbeitnow-sdk/go"

client := sdk.NewArbeitnowSDK(map[string]any{})

// List all jobs
jobs, err := client.Job(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Arbeitnow_sdk"

client = ArbeitnowSDK.new({})

# List all jobs
jobs, err = client.Job(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("arbeitnow_sdk")

local client = sdk.new({})

-- List all jobs
local jobs, err = client:Job(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ArbeitnowSDK.test()
const result = await client.Job().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ArbeitnowSDK.test(None, None)
result, err = client.Job(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ArbeitnowSDK::test(null, null);
[$result, $err] = $client->Job(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Job(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ArbeitnowSDK.test(nil, nil)
result, err = client.Job(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Job(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Arbeitnow

- Upstream: [https://www.arbeitnow.com/](https://www.arbeitnow.com/)
- API docs: [https://www.arbeitnow.com/api/job-board-api](https://www.arbeitnow.com/api/job-board-api)

- No explicit open licence is published with the API
- Job listings are sourced from Arbeitnow's public board and may carry employer-specific terms
- Attribution and a link back to arbeitnow.com is the typical expectation for republished postings
- Confirm current terms at [arbeitnow.com](https://www.arbeitnow.com/) before redistributing data

---

Generated from the Arbeitnow OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
