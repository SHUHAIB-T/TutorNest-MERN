import { useAppSelector, useAppDispatch } from "../../app/store";
import { getStudentProfile } from "../../features/users/userServieces";
import { useEffect } from "react";
import { reset } from "../../features/users/userSlice";

import StudentNav from "../../components/NavBar/StudentNav";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import StudentSideBar from "../../components/StudentSideBar/StudentSideBar";
import Loader from "../../components/Loader/Loader";
import StudentProfile from "../../components/StudentProfile/StudentProfile";
import { useState } from "react";

export default function ProfilePage() {
  const [submit, setSubmit] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, isError, errorMessage, isSuccess } = useAppSelector(
    (state) => state.userProfile
  );

  useEffect(() => {
    dispatch(getStudentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
      dispatch(reset());
    }
  }, [errorMessage, isError, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      setSubmit(false);
    }
  }, [isSuccess, dispatch]);

  return (
    <>
      <StudentNav />
      <div className="flex md:p-10 p-4 gap-10 bg-secondary">
        <StudentSideBar />
        <div className="flex w-full flex-col">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <ProfileCard />
              <StudentProfile submit={submit} setSubmit={setSubmit} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
