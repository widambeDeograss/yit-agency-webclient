export interface Category {
    id: number;
    name: string;
    description: string;
    parent: number | null;
    parent_name: string | null;
  }