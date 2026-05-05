import { fetchAdminCategoryById } from "./api";
import type { AdminCategoryNode, AdminCategoryParentPick } from "./types";
import { resolveParentFromCategoryDetail } from "./parent-resolve";

type Result = Readonly<{
  options: AdminCategoryParentPick[];
  selectedParentId: number | null;
}>;

/**
 * Parent dropdown on edit must include this row’s actual parent — even though
 * the create-picker only lists leaf categories (often excluding parents that
 * already have children).
 */
export async function buildParentDropdownForCategoryEdit(
  editingSelfId: number,
  detail: AdminCategoryNode,
  baseLeafParentOptions: AdminCategoryParentPick[],
): Promise<Result> {
  let optionsList = baseLeafParentOptions.filter((p) => p.id !== editingSelfId);

  const resolvedParent = resolveParentFromCategoryDetail(detail);
  const selectedParentId = resolvedParent?.id ?? null;

  if (
    resolvedParent !== null &&
    selectedParentId !== null &&
    !optionsList.some((p) => p.id === selectedParentId)
  ) {
    let parentName = resolvedParent.nameHint ?? null;
    if (!parentName) {
      const pr = await fetchAdminCategoryById(selectedParentId);
      parentName = pr.ok ? pr.data.name : `Category #${selectedParentId}`;
    }
    optionsList = [...optionsList, { id: selectedParentId, name: parentName }];
  }

  optionsList.sort((a, b) => a.name.localeCompare(b.name));

  return { options: optionsList, selectedParentId };
}
