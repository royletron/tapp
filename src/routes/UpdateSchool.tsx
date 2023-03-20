import CreateUpdateSchool from "containers/CreateUpdateSchool";
import useSchools from "hooks/useSchools";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

/**
 * Update a school page
 */
export default function UpdateSchool() {
  let { schoolId } = useParams();
  const { schools, isLoading } = useSchools();
  const school = schools?.find((school) => school.id === schoolId);
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (!school) {
    return <NotFound />;
  }
  return <CreateUpdateSchool existingSchool={school} />;
}
