# Typed models for the Arbeitnow SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Job(TypedDict, total=False):
    company_name: str
    created_at: int
    description: str
    job_types: list
    location: str
    remote: bool
    slug: str
    tags: list
    title: str
    url: str


class JobListMatch(TypedDict, total=False):
    location: str
    page: int
    search: str
