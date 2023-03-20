import useDeleteSchool from "hooks/useDeleteSchool";
import useSchools from "hooks/useSchools";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NotFound from "./NotFound";

/**
 * Delete confirmation
 */
export default function ConfirmDelete() {
  let { schoolId } = useParams();
  const { schools, isLoading } = useSchools();
  const navigate = useNavigate();
  const school = schools?.find((school) => school.id === schoolId);
  const { mutate: deleteSchool, isMutating } = useDeleteSchool();
  const confirm = async () => {
    try {
      if (!schoolId) return;
      await deleteSchool(schoolId);
      toast.success(`${school?.name} has been deleted`);
      navigate("/");
    } catch (error: any) {
      toast.error(`Unable to delete: ${error.message}`);
    }
  };
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (!school) {
    return <NotFound />;
  }
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative">
      <div className="card w-96 bg-base-200">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Please Confirm!</h2>
          <p className="my-2">
            You want to delete <b>{school.name}</b>
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-error" onClick={confirm}>
              Yes
            </button>
            <Link to="/" className="btn btn-ghost">
              Cancel
            </Link>
          </div>
        </div>
      </div>
      {isMutating && (
        <div className="absolute inset-0 bg-base-100 bg-opacity-90 flex flex-col items-center justify-center">
          <p className="mb-2">Deleting</p>
          <progress className="progress w-56"></progress>
        </div>
      )}
    </div>
  );
}
