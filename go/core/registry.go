package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewJobEntityFunc func(client *ArbeitnowSDK, entopts map[string]any) ArbeitnowEntity

