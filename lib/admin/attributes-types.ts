export type AdminAttributesListData = {
  attributes: AdminAttributeRow[];
  pagination: AdminAttributesPagination;
};

export type AdminAttributeRow = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type AdminAttributesPagination = {
  total_count: number;
  current_page: number;
  next_page: number | null;
  previous_page: number | null;
  total_pages: number;
  per_page: number;
};
