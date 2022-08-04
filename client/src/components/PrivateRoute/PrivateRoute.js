import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/isAuthenticated";

export const PrivateRoute = () => {
  const user = useSelector((state) => state.user);
  const authenticated = isAuthenticated(user);
  return authenticated ? <Outlet /> : <Navigate to="/login" replace={true} />;
};
