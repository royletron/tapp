import useCreateSchool from "hooks/useCreateSchool";
import classNames from "classnames";
import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { School } from "types/schools";
import useUpdateSchool from "hooks/useUpdateSchool";

/**
 * General purpose school form, can be used to create or update a school
 * @param existingSchool The school to update, if any
 */
export default function SchoolForm({
  existingSchool,
}: {
  existingSchool?: School;
}) {
  // hooks
  const { mutate: createSchool, isMutating: isCreateMutating } =
    useCreateSchool();
  const { mutate: updateSchool, isMutating: isUpdateMutation } =
    useUpdateSchool();
  const isMutating = isCreateMutating || isUpdateMutation;
  const navigate = useNavigate();
  const [name, setName] = useState(existingSchool?.name || "");
  const [validationError, setValidationError] = useState<string | null>(null);

  // callbacks
  const onSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    if (name.length) {
      try {
        if (existingSchool) {
          await updateSchool(existingSchool.id, name);
          toast.success(`${name} has been updated`);
        } else {
          await createSchool(name);
          toast.success(`${name} has been created`);
        }
        navigate("/");
      } catch (error: any) {
        toast.error(`Unable to create: ${error.message}`);
      }
    } else {
      setValidationError("Please enter a school name");
    }
  };

  // effects
  useMemo(() => {
    if (existingSchool) {
      setName(existingSchool.name);
    } else {
      setName("");
    }
  }, [existingSchool]);
  useMemo(() => {
    if (validationError && name.length) {
      setValidationError(null);
    }
  }, [name, validationError]);

  return (
    <form className="relative flex-1" onSubmit={onSubmit}>
      <h2 className="text-lg mb-4">
        {existingSchool
          ? `Update ${existingSchool.name}`
          : "Create a new school"}
      </h2>
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
        className={classNames("btn btn-primary mt-4", isMutating && "loading")}
      >
        {existingSchool ? "Update" : "Create"}
      </button>
    </form>
  );
}
