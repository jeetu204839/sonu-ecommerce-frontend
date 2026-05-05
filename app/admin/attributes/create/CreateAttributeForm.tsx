"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { createAttributeAction } from "@/app/admin/attributes/create/actions";
import {
  createAttributeInitialState,
  type CreateAttributeFormState,
} from "@/lib/admin/attribute/create-form-state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving…" : "Submit"}
    </button>
  );
}

export default function CreateAttributeForm() {
  const [state, formAction] = useActionState<
    CreateAttributeFormState,
    FormData
  >(createAttributeAction, createAttributeInitialState);

  const showError = !state.ok && state.message.trim() !== "";

  return (
    <form action={formAction} noValidate>
      <div className="box-body">

        <div className="form-group">
          <label htmlFor="attribute-name">Attribute name <span className="text-danger">*</span></label>
          <input
            id="attribute-name"
            name="name"
            type="text"
            className="form-control"
            placeholder="e.g. Features"
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
