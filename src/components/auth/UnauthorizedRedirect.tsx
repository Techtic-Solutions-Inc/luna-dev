import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { subscribeUnauthorized } from "@/lib/auth/session";

/** Routes to login once on HTTP 401; never loops on /login. */
export function UnauthorizedRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return subscribeUnauthorized(() => {
      if (location.pathname === "/login") {
        return;
      }
      navigate("/login", { replace: true, state: { from: location.pathname } });
    });
  }, [location.pathname, navigate]);

  return null;
}
