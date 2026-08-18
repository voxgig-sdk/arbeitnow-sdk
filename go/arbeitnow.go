package voxgigarbeitnowsdk

import (
	"github.com/voxgig-sdk/arbeitnow-sdk/go/core"
	"github.com/voxgig-sdk/arbeitnow-sdk/go/entity"
	"github.com/voxgig-sdk/arbeitnow-sdk/go/feature"
	_ "github.com/voxgig-sdk/arbeitnow-sdk/go/utility"
)

// Type aliases preserve external API.
type ArbeitnowSDK = core.ArbeitnowSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ArbeitnowEntity = core.ArbeitnowEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ArbeitnowError = core.ArbeitnowError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewJobEntityFunc = func(client *core.ArbeitnowSDK, entopts map[string]any) core.ArbeitnowEntity {
		return entity.NewJobEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewArbeitnowSDK = core.NewArbeitnowSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewArbeitnowSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ArbeitnowSDK  { return NewArbeitnowSDK(nil) }
func Test() *ArbeitnowSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
