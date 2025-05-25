export interface FilterOption {
    value: string;
    count: number;
}
  
export interface PostFilterResult {
    params: FilterOption[];
    work_hours: FilterOption[];
    types: FilterOption[];
}