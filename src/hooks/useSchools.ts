import useSWR, { Fetcher } from "swr";
import { SchoolList } from "types/schools";
import fetcher from "utils/fetcher";

const SchoolListFetcher: Fetcher<SchoolList, string> = fetcher;

/**
 * useSchools hook
 * @returns an object containing the list of schools, a boolean indicating if the data is loading, an error object, and a mutate function
 */
export default function useSchools() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/school",
    SchoolListFetcher
  );

  return {
    schools: data,
    isLoading,
    error,
    mutate,
  };
}
