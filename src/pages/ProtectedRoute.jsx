import { useNavigate } from "react-router-dom";
import { useFakeAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isLoged } = useFakeAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isLoged) navigate("/");
    },
    [isLoged, navigate]
  );
  return isLoged ? children : null;
}

export default ProtectedRoute;
