type Props = { children?: React.ReactNode };
export type RFC<T = Props> = React.FC<T>

export interface IPagination {
  total:       number;
  perPage:     number;
  currentPage: number;
  totalPages:  number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Route {
  params: { id: string }
}