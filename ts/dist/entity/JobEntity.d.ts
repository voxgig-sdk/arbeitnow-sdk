import { ArbeitnowEntityBase } from '../ArbeitnowEntityBase';
import type { ArbeitnowSDK } from '../ArbeitnowSDK';
import type { Control } from '../types';
import type { Job, JobListMatch } from '../ArbeitnowTypes';
declare class JobEntity extends ArbeitnowEntityBase<Job> {
    constructor(client: ArbeitnowSDK, entopts: any);
    make(this: JobEntity): JobEntity;
    list(this: any, reqmatch?: JobListMatch, ctrl?: Control): Promise<JobEntity[]>;
}
export { JobEntity };
