export interface GetListRes {
    page: number,
    total_pages: number,
    data: Resource[],
}

export interface Resource {
    id: number,
    name: string,
    year: number,
    color: string,
    pantone_value: string,

}

export interface ResourcePager {
    page: number,
    total_pages: number,
}