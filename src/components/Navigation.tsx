import { Link } from "react-router-dom";

/**
 * Navigation bar
 */
export default function Navigation() {
  return (
    <div className="navbar bg-base-200">
      <div className="max-w-7xl w-full mx-auto px-4">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl inline-flex items-center gap-2"
        >
          <img
            src="/school.svg"
            className="w-10 h-10"
            alt="Schoolz list logo"
          />
          Schoolz List
        </Link>
      </div>
    </div>
  );
}
