import { useState } from "react";
import useSchools from "./useSchools";

/**
 * useUpdateSchool hook
 * @returns a function that takes a school id and name and returns a promise that resolves with the updated school
 */
export default function useUpdateSchool() {
  const [isMutating, setIsMutating] = useState(false);
  const { schools, mutate: mutateSchoolsHook } = useSchools();

  const mutate = async (id: string, name: string) => {
    setIsMutating(true);
    const response = await fetch(`/api/school/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (response.status !== 200) {
      throw new Error("Error updating school");
    }
    const school = await response.json();
    mutateSchoolsHook(schools?.map((s) => (s.id === id ? school : s)));
    setIsMutating(false);
  };

  return { mutate, isMutating };
}
