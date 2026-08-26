package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Arbeitnow",
			"slug": "arbeitnow",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://www.arbeitnow.com/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"job": map[string]any{},
			},
		},
		"entity": map[string]any{
			"job": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "company_name",
						"short": "Name of the hiring company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"short": "Timestamp when the job was created",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed job description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "job_types",
						"short": "Type of employment (e.g., full-time, part-time, contract)",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "location",
						"short": "Job location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "remote",
						"short": "Whether the job offers remote work",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "slug",
						"short": "Unique identifier for the job posting",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"short": "Tags associated with the job (e.g., technologies, skills)",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"short": "Job title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "URL to the job posting",
						"type": "`$STRING`",
					},
				},
				"name": "job",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/job-board-api",
								"parts": []any{
									"job-board-api",
								},
								"select": map[string]any{
									"exist": []any{
										"location",
										"page",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
