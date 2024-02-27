import { Link } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function StudentSideBar() {
  const [isHidden, setIsHidden] = useState("hidden");
  return (
    <div className="flex-col w-full max-w-80 min-w-72 flex items-start">
      <span
        onClick={() =>
          setIsHidden((v) => (v === "hidden" ? "inline-block" : "hidden"))
        }
        className="font-bold inline-block md:hidden text-white"
      >
        <MenuIcon />
      </span>
      <div
        className={`${isHidden} rounded-xl space-y-2 font-bold text-2xl w-full h-fit min-w-72 p-3 md:inline-block bg-[#302343] ring-1 ring-[#4d2389] text-gray-300`}
      >
        <Link
          to={"/student/profile"}
          className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
        >
          <AccountCircleIcon /> MY PROFILE
        </Link>
        <Link
          to={"/student/posts"}
          className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
        >
          <EditCalendarIcon /> MY POSTS
        </Link>
        <Link
          to={"#"}
          className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
        >
          <ArticleIcon /> MY COURSES
        </Link>
        <Link
          to={"/student/my-tutors"}
          className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
        >
          <SchoolIcon /> My TUTORS
        </Link>
        <Link
          to={"/student/requests"}
          className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
        >
          <ConnectWithoutContactIcon /> REQUESTS
        </Link>
      </div>
    </div>
  );
}
