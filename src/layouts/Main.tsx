import { Outlet } from "react-router-dom";
import Navigation from "components/Navigation";

export default function MainLayout() {
  return (
    <div className="flex flex-col">
      <Navigation />
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Outlet />
      </div>
    </div>
  );
}
