/** One category node (nested `children` as returned by admin category APIs). */

export type AdminCategoryNode = {
  id: number;
  /** Present on some APIs when moving a category under another parent. */
  parentId?: number | string | null;
  parent_id?: number | string | null;
  /** Some APIs nest the parent row on GET detail. */
  parent?: { id: number | string; name?: string | null } | null;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  status: string;
  metaTitle: string | null;
  metaDesc: string | null;
  isFeatured: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  children: AdminCategoryNode[] | null;
  productCount?: number;
};

export type AdminCategoriesPagination = {
  total_count: number;
  current_page: number;
  next_page: number | null;
  previous_page: number | null;
  total_pages: number;
  per_page: number;
};

export type AdminCategoriesListData = {
  categories: AdminCategoryNode[];
  pagination: AdminCategoriesPagination;
};

export type AdminCategoryParentPick = Readonly<{
  id: number;
  name: string;
}>;
