import { Link } from "react-router-dom";

/**
 * Irreverent 404 page
 */
export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <img src="/shrug.svg" className="w-24 h-24 animate-bounce" />
      <h1 className="text-xl">Not found...</h1>
      <Link className="btn btn-primary mt-4" to="/">
        Go home
      </Link>
    </div>
  );
}
