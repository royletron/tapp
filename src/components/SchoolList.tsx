import { Fragment } from "react";
import { School, SchoolList } from "types/schools";
import { Link } from "react-router-dom";
//@ts-ignore no types....
import gradient from "random-gradient";

const School = (data: School) => {
  const bgGradient = { background: gradient(data.id) };
  const handleDelete = async () => {};
  return (
    <Fragment>
      <div className="card card-side bg-base-100 shadow-xl border border-base-300">
        <figure>
          <div className="hidden md:block h-full w-24" style={bgGradient} />
        </figure>
        <div className="card-body flex flex-row">
          <h2 className="card-title flex-1">{data.name}</h2>
          <div className="card-actions justify-end flex gap-2">
            <Link
              to={`/school/${data.id}/update`}
              className="btn btn-secondary btn-sm"
            >
              Update
            </Link>
            <Link
              to={`/school/${data.id}/delete`}
              className="btn btn-error btn-sm"
              onClick={handleDelete}
            >
              Delete
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

/**
 * List of schools
 * @param schools Schools to display
 */
export default function SchoolList({ schools }: { schools: SchoolList }) {
  return (
    <div className="flex flex-col gap-4">
      {schools.map((school) => (
        <School key={school.id} {...school} />
      ))}
    </div>
  );
}
