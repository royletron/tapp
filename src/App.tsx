import { Route, Routes } from "react-router-dom";
import MainLayout from "layouts/Main";
import Home from "routes/Home";
import ConfirmDelete from "routes/ConfirmDelete";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react";
import NewSchool from "routes/NewSchool";
import UpdateSchool from "routes/UpdateSchool";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "routes/NotFound";

/**
 * The main app component, runs all of the routing
 */
function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="new" element={<NewSchool />} />
          <Route path="school/:schoolId">
            <Route path="delete" element={<ConfirmDelete />} />
            <Route path="update" element={<UpdateSchool />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
