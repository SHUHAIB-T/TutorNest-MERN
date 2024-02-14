import StudentNav from "../../components/NavBar/StudentNav";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";

type prop = {
  role: string;
};
export default function HomPage({ role }: prop) {
  if (role === "STUDENT") {
    return (
      <>
        <StudentNav />
        <div className="w-full h-[100vh] bg-secondary"></div>
      </>
    );
  } else if (role === "TUTOR") {
    return (
      <>
        <NavBar role="TUTOR" />
        <div className="w-full h-[100vh] gap-3 p-5 flex flex-wrap bg-secondary">
          <div className="card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]">
            <h1 className="font-bold text-4xl text-white">MY Profile</h1>
            <Link to={"/tutor/profile"}>
              <h1 className="absolute top-3 right-5  text-[#9747FF]">View</h1>
            </Link>
          </div>
          <div className="card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]">
            <h1 className="font-bold text-4xl text-white">MY Students</h1>
            <Link to={"#"}>
              <h1 className="absolute top-3 right-5  text-[#9747FF]">View</h1>
            </Link>
          </div>
          <div className="card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]">
            <h1 className="font-bold text-4xl text-white">MY documents</h1>
            <Link to={"#"}>
              <h1 className="absolute top-3 right-5  text-[#9747FF]">View</h1>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavBar role="USER" />
        <div className="w-full h-[100vh] bg-secondary"></div>
      </>
    );
  }
}
