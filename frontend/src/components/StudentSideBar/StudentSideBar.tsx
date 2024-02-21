import { Link } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

export default function StudentSideBar() {
  return (
    <div className="hidden rounded-xl space-y-2 font-bold text-2xl h-fit p-3 md:inline-block bg-[#302343] ring-1 ring-[#4d2389] text-gray-300">
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
        to={"#"}
        className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
      >
        <NotificationsActiveIcon /> NOTIFICATIONS
      </Link>
      <Link
        to={"/student/requests"}
        className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
      >
        <ConnectWithoutContactIcon /> REQUESTS
      </Link>
    </div>
  );
}
