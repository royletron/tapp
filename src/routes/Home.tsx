import useSchools from "hooks/useSchools";
import SchoolList from "components/SchoolList";
import { Link } from "react-router-dom";
import { Fragment } from "react";

/**
 * Home page, shows a list of schools or links to add a school
 */
export default function Home() {
  const { schools, isLoading } = useSchools();
  return (
    <div>
      {isLoading ? (
        <progress className="progress w-56"></progress>
      ) : schools?.length ? (
        <Fragment>
          <div className="mb-4 flex justify-end">
            <Link to="/new" className="btn btn-primary">
              Add a school
            </Link>
          </div>
          <SchoolList schools={schools} />
        </Fragment>
      ) : (
        <div className="bg-base-200 rounded-md p-6">
          <h2 className="text-xl">No schools in the database</h2>
          <Link to="/new" className="btn btn-primary mt-4">
            Add a school
          </Link>
        </div>
      )}
    </div>
  );
}
