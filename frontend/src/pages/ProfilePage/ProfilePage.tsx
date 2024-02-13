import { useAppSelector, useAppDispatch } from "../../app/store";
import { getStudentProfile } from "../../features/users/userServieces";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { reset } from "../../features/users/userSlice";

import StudentNav from "../../components/NavBar/StudentNav";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import StudentSideBar from "../../components/StudentSideBar/StudentSideBar";
import Loader from "../../components/Loader/Loader";
import StudentProfile from "../../components/StudentProfile/StudentProfile";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { isLoading, isError, errorMessage, isSuccess } = useAppSelector(
    (state) => state.userProfile
  );

  useEffect(() => {
    dispatch(getStudentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage.message);
      dispatch(reset());
    }
  }, [errorMessage, isError, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <StudentNav />
      <div className="flex md:p-10 p-4 gap-10 bg-secondary">
        <StudentSideBar />
        <div className="flex w-full flex-col">
          <ProfileCard />
          <StudentProfile />
        </div>
      </div>
    </>
  );
}
