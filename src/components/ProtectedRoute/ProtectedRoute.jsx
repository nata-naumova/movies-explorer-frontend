import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/" />;
}
