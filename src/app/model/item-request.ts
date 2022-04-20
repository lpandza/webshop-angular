export interface ItemRequest {
  key: string | undefined,
  direction: string | undefined,
  itemsPerPage: number,
  page: number,
  minPrice: number | undefined,
  maxPrice: number | undefined,
  brands: number[];
}
