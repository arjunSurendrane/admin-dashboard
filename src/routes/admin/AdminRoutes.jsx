import { Route, Routes } from "react-router-dom";
import AdminOutlet from "./AdminOutlet";
import ManageUsers from "../../pages/admin/ManageUsers";
import AdminLogin from "../../pages/admin/Login";
import Header from "../../components/Header";
import UserProfile from "../../pages/user/Profile";

export default function AdminRoutes() {
  const token = localStorage.getItem("adminJwt");
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
      </Routes>
      {token && (
        <div className="mt-5">
          <Header menuItem={[{ name: "Employees", link: "/employees" }]} />
        </div>
      )}

      <Routes>
        <Route path="*" element={<AdminOutlet />}>
          <Route path="employees" element={<ManageUsers />} />
          <Route path=":empid/employee" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}
