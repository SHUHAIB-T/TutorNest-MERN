import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Authenticate() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return <>{!user ? <Outlet /> : null}</>;
}
