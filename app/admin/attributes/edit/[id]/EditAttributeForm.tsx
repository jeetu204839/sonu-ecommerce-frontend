"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { updateAttributeAction } from "@/app/admin/attributes/edit/[id]/actions";
import {
  editAttributeInitialState,
  type EditAttributeFormState,
} from "@/lib/admin/attribute/edit-form-state";

type Props = Readonly<{
  id: number;
  initialName: string;
}>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Updating..." : "Update"}
    </button>
  );
}

export default function EditAttributeForm({ id, initialName }: Props) {
  const [state, formAction] = useActionState<EditAttributeFormState, FormData>(
    updateAttributeAction,
    editAttributeInitialState,
  );

  const showError = !state.ok && state.message.trim() !== "";

  return (
    <form action={formAction} noValidate>
      <input type="hidden" name="id" value={id} />

      <div className="box-body">
      
        <div className="form-group">
          <label htmlFor="attribute-name">Attribute name</label>
          <input
            id="attribute-name"
            name="name"
            type="text"
            className="form-control"
            placeholder="e.g. Features"
            defaultValue={initialName}
            autoComplete="off"
            required
            maxLength={255}
          />
          {showError ? ( <span className="text-danger"> {state.message}</span> ) : null}
        </div>
      </div>

      <div className="box-footer">
        <SubmitButton />
      </div>
    </form>
  );
}
