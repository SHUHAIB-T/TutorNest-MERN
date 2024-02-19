import NavBar from "../../components/NavBar/NavBar";
import AdminSideBar from "../../components/AdminSidebar/AdminSideBar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { Skeleton } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { useEffect } from "react";
import { getStudentProfile } from "../../features/users/userServieces";

export default function AdminProfile() {
  const { isLoading } = useAppSelector((state) => state.userProfile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStudentProfile());
  }, [dispatch]);
  return (
    <>
      <div className="w-[100vw]">
        <NavBar role="TUTOR" />
        <div className="flex md:p-10 p-4 gap-10 bg-secondary md:pb-[334px]">
          <AdminSideBar />
          <div className="flex flex-col w-[100%]">
            {isLoading ? (
              <div className="flex flex-wrap gap-3">
                <Skeleton variant="circular" width={200} height={200} />
                <Skeleton variant="rectangular" width={500} height={200} />
              </div>
            ) : (
              <ProfileCard />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
