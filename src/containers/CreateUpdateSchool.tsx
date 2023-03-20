import useCreateSchool from "hooks/useCreateSchool";
import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { School } from "types/schools";
import useUpdateSchool from "hooks/useUpdateSchool";
import SchoolForm from "components/SchoolForm";

/**
 * Logic for working with school forms
 * @param existingSchool The school to update, if any
 */
export default function CreateUpdateSchool({
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
    <SchoolForm
      onSubmit={onSubmit}
      title={
        existingSchool ? `Update ${existingSchool.name}` : "Create a new school"
      }
      name={name}
      setName={setName}
      validationError={validationError}
      isLoading={isMutating}
      submitText={existingSchool ? "Update" : "Create"}
    />
  );
}
