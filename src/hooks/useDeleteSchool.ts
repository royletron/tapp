import { useState } from "react";
import useSchools from "./useSchools";

/**
 * useDeleteSchools hook
 * @returns a function that takes a school id and returns a promise that resolves when the school is deleted
 */
export default function useDeleteSchool() {
  const [isMutating, setIsMutating] = useState(false);
  const { schools, mutate: mutateSchoolsHook } = useSchools();

  const mutate = async (id: string) => {
    setIsMutating(true);
    const response = await fetch(`/api/school/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      throw new Error("Error deleting school");
    }
    mutateSchoolsHook(schools?.filter((school) => school.id !== id));
    setIsMutating(false);
  };

  return { mutate, isMutating };
}
