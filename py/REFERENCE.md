# Arbeitnow Python SDK Reference

Complete API reference for the Arbeitnow Python SDK.


## ArbeitnowSDK

### Constructor

```python
from arbeitnow_sdk import ArbeitnowSDK

client = ArbeitnowSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ArbeitnowSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ArbeitnowSDK.test()
```


### Instance Methods

#### `Job(data=None)`

Create a new `JobEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## JobEntity

```python
job = client.Job()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `company_name` | `str` | No | Name of the hiring company |
| `created_at` | `int` | No | Timestamp when the job was created |
| `description` | `str` | No | Detailed job description |
| `job_types` | `list` | No | Type of employment (e.g., full-time, part-time, contract) |
| `location` | `str` | No | Job location |
| `remote` | `bool` | No | Whether the job offers remote work |
| `slug` | `str` | No | Unique identifier for the job posting |
| `tags` | `list` | No | Tags associated with the job (e.g., technologies, skills) |
| `title` | `str` | No | Job title |
| `url` | `str` | No | URL to the job posting |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Job().list()
for job in results:
    print(job)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JobEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ArbeitnowSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

