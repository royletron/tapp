import classNames from "classnames";
import { FormEvent } from "react";

/**
 * General purpose school form, can be used to create or update a school
 * @param onSubmit The function to call when the form is submitted
 * @param title The title of the form
 * @param name The name of the school
 * @param setName The function to call when the name changes
 * @param validationError The validation error, if any, to display
 * @param isLoading Whether the form is loading
 * @param submitText The text to display on the submit button
 */
export default function SchoolForm({
  onSubmit,
  title,
  name,
  setName,
  validationError,
  isLoading,
  submitText,
}: {
  onSubmit: (evt: FormEvent) => Promise<void>;
  title: string;
  name: string;
  setName: (name: string) => void;
  validationError?: string | null;
  isLoading: boolean;
  submitText: string;
}) {
  return (
    <form className="relative flex-1" onSubmit={onSubmit}>
      <h2 className="text-lg mb-4">{title}</h2>
      <div className="form-control w-full max-w-lg">
        <label className="label">
          <span className="label-text">School Name</span>
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="The Batt School"
          className={classNames(
            "input input-bordered w-full",
            validationError && "input-error"
          )}
        />
        {validationError && (
          <label className="label">
            <span className="label-text-alt text-error">{validationError}</span>
          </label>
        )}
      </div>
      <button
        type="submit"
        className={classNames("btn btn-primary mt-4", isLoading && "loading")}
      >
        {submitText}
      </button>
    </form>
  );
}
