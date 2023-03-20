import { useState } from "react";
import useSchools from "./useSchools";

/**
 * useCreateSchool hook
 * @returns a function that takes a school name and returns a promise that resolves with the new school
 */
export default function useCreateSchool() {
  const [isMutating, setIsMutating] = useState(false);
  const { schools, mutate: mutateSchoolsHook } = useSchools();

  const mutate = async (name: string) => {
    setIsMutating(true);
    const response = await fetch("/api/school", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (response.status !== 200) {
      throw new Error("Error creating school");
    }
    const school = await response.json();
    mutateSchoolsHook([...(schools || []), school]);
    setIsMutating(false);
  };

  return { mutate, isMutating };
}
