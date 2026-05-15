# Arbeitnow SDK utility: make_context

from core.context import ArbeitnowContext


def make_context_util(ctxmap, basectx):
    return ArbeitnowContext(ctxmap, basectx)
