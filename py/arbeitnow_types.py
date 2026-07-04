# Typed models for the Arbeitnow SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Job:
    company_name: Optional[str] = None
    created_at: Optional[int] = None
    description: Optional[str] = None
    job_type: Optional[list] = None
    location: Optional[str] = None
    remote: Optional[bool] = None
    slug: Optional[str] = None
    tag: Optional[list] = None
    title: Optional[str] = None
    url: Optional[str] = None


@dataclass
class JobListMatch:
    company_name: Optional[str] = None
    created_at: Optional[int] = None
    description: Optional[str] = None
    job_type: Optional[list] = None
    location: Optional[str] = None
    remote: Optional[bool] = None
    slug: Optional[str] = None
    tag: Optional[list] = None
    title: Optional[str] = None
    url: Optional[str] = None

