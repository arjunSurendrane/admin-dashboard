import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/admin/AdminRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
