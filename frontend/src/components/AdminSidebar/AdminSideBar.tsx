import { Link } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import PeopleIcon from "@mui/icons-material/People";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
export default function AdminSideBar() {
  return (
    <div className="hidden rounded-xl space-y-2 font-bold text-2xl h-fit p-3 md:inline-block bg-[#302343] ring-1 ring-[#4d2389] min-w-80 text-gray-300">
      <Link
        to={"/admin"}
        className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
      >
        <GridViewIcon /> Dasboard
      </Link>
      <Link
        to={"#"}
        className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
      >
        <PeopleIcon /> Manage Tutors
      </Link>
      <Link
        to={"#"}
        className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
      >
        <PeopleOutlineIcon /> Manage Students
      </Link>
      <Link
        to={"/admin/profile"}
        className="hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2"
      >
        <SettingsIcon /> Settings
      </Link>
    </div>
  );
}
