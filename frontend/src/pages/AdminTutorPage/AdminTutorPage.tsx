import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import api from "../../API/api";
import AdminTutorTable from "../../components/AdminTutorTable/AdminTutorTable";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { IAdminTutor } from "../../types/adminUserTypes";
import { debaunce } from "../../components/util/utilityFuctions";

export default function AdminTutorPage() {
  const [tutorData, setTutorData] = useState<IAdminTutor[]>([]);
  const [blockId, setBlockId] = useState<string>("");
  const [unblockId, setunBlockId] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const debaunceSearch = debaunce((text: string) => {
    setSearch(text);
  }, 500);

  useEffect(() => {
    (async function () {
      try {
        const response = await api.get(`/admin/tutors?search=${search}`, {
          withCredentials: true,
        });
        setTutorData(response.data.teachers);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [blockId, unblockId, search]);

  return (
    <>
      <NavBar role="TUTOR" />
      <div className="flex flex-col items-center md:p-10 p-4 w-full h-[100vh] bg-secondary">
        <h1 className="font-bold text-white text-4xl">MANAGE TUTORS</h1>
        <div className="flex flex-wrap items-center justify-between mt-10 w-full md:w-[80%]">
          <Link to={"/"} className="font-bold text-white">
            <ChevronLeftIcon className="mb-1" /> Back
          </Link>
          <div className="flex justify-center items-center">
            <input
              onChange={(e) => debaunceSearch(e.target.value)}
              className="h-8 rounded-lg "
              type="text"
            />
            <SearchIcon fontSize="large" className="text-white" />
          </div>
        </div>
        <AdminTutorTable
          setBlockId={setBlockId}
          blockId={blockId}
          tutorData={tutorData}
          unblockId={unblockId}
          setunBlockId={setunBlockId}
        />
      </div>
    </>
  );
}
