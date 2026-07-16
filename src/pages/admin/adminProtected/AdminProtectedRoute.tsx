import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const token = localStorage.getItem("thisistoken");
  const role = localStorage.getItem("role");

  console.log("Token:", token);
  console.log("Role:", role);

  if (!token) {
    console.log("No token");
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    console.log("Not admin");
    return <Navigate to="/" replace />;
  }

  console.log("Admin allowed");

  return <Outlet />;
}

export default AdminProtectedRoute;