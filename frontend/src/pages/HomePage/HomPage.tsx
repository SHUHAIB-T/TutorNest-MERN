import StudentNav from "../../components/NavBar/StudentNav";
import NavBar from "../../components/NavBar/NavBar";

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
        <div className="w-full h-[100vh] bg-secondary"></div>
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
