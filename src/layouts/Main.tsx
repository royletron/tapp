import { Outlet } from "react-router-dom";
import Navigation from "components/Navigation";

export default function MainLayout() {
  return (
    <div className="h-full flex flex-col">
      <Navigation />
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 flex-col flex">
        <Outlet />
      </div>
    </div>
  );
}
