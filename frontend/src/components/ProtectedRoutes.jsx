import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
