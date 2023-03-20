import { Route, Routes } from "react-router-dom";
import MainLayout from "layouts/Main";
import Home from "routes/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
