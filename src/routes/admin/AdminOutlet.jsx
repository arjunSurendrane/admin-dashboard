import { Navigate, Outlet } from "react-router-dom";

function AdminOutlet() {
  const adminJwt = localStorage.getItem("adminJwt");
  if (adminJwt) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default AdminOutlet;
