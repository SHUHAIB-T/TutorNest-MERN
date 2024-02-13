import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Authenticate() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user as string);
  console.log(parseUser)
  useEffect(() => {
    if (parseUser?.role === "STUDENT") {
      navigate("/student");
    } else if (parseUser?.role === "TUTOR") {
      navigate("/tutor");
    }
  }, [parseUser, navigate]);
  return <>{!user ? <Outlet /> : null}</>;
}
