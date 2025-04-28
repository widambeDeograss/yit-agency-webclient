export interface Category {
    id: number;
    name: string;
    description: string;
    parent: number | null;
    parent_name: string | null;
  }


export interface CategoryApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Category[];
  }