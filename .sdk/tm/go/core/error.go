package core

type ArbeitnowError struct {
	IsArbeitnowError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewArbeitnowError(code string, msg string, ctx *Context) *ArbeitnowError {
	return &ArbeitnowError{
		IsArbeitnowError: true,
		Sdk:              "Arbeitnow",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ArbeitnowError) Error() string {
	return e.Msg
}
