import StudentNav from "../../components/NavBar/StudentNav";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

type prop = {
  role: string;
};
export default function HomPage({ role }: prop) {
  if (role === "STUDENT") {
    return (
      <>
        <StudentNav />
        <div className="w-full h-[100vh] bg-[#1e101c]">
          <form className="w-full flex backdrop-blur-xl justify-center py-36 bg-[url('https://static.vecteezy.com/system/resources/previews/016/341/324/original/deep-dark-violet-neon-lights-watercolor-on-black-background-dark-purple-grungy-background-dark-purple-marble-texture-background-old-purple-paper-background-purple-stained-grungy-background-free-vector.jpg')] bg-no-repeat ">
            <div className="text-white shadow-2xl bg-[#2e1422] ring-[#662080] ring-1 flex w-96 items-center justify-between rounded-full">
              <input
                type="text"
                placeholder="find courses"
                className="rounded-s-full bg-[#1b0a1b] border-0 w-[90%] bg-transparent"
              />
              <button>
                <SearchIcon className="me-2 " />
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else if (role === "TUTOR") {
    return (
      <>
        <NavBar role="TUTOR" />
        <div className="flex justify-center w-full bg-secondary py-20">
          <div className="text-white shadow-2xl bg-[#2e1422] ring-[#662080] ring-1 flex w-96 items-center justify-between rounded-full">
            <input
              type="text"
              placeholder="find courses"
              className="rounded-s-full bg-[#1b0a1b] border-0 w-[90%] bg-transparent"
            />
            <button>
              <SearchIcon className="me-2 " />
            </button>
          </div>
        </div>
        <div className="w-full pb-96 gap-3 flex justify-center flex-wrap bg-secondary">
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
            <Link to={"/tutor/documents"}>
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
        <div className="w-full h-[100vh] bg-[#1e101c]">
          <form className="w-full flex backdrop-blur-xl justify-center py-36 bg-[url('https://static.vecteezy.com/system/resources/previews/016/341/324/original/deep-dark-violet-neon-lights-watercolor-on-black-background-dark-purple-grungy-background-dark-purple-marble-texture-background-old-purple-paper-background-purple-stained-grungy-background-free-vector.jpg')] bg-no-repeat ">
            <div className="text-white shadow-2xl bg-[#2e1422] ring-[#662080] ring-1 flex w-96 items-center justify-between rounded-full">
              <input
                type="text"
                placeholder="find courses"
                className="rounded-s-full bg-[#1b0a1b] border-0 w-[90%] bg-transparent"
              />
              <button>
                <SearchIcon className="me-2 " />
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
