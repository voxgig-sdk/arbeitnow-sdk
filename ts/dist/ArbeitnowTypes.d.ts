export interface Job {
    company_name?: string;
    created_at?: number;
    description?: string;
    job_types?: any[];
    location?: string;
    remote?: boolean;
    slug?: string;
    tags?: any[];
    title?: string;
    url?: string;
}
export interface JobListMatch {
    location?: string;
    page?: number;
    search?: string;
}
