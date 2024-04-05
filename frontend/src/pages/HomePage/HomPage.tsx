import { useEffect, useState } from "react";
import StudentNav from "../../components/NavBar/StudentNav";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ISearch } from "../../types/courseType";
import { getAllCourses } from "../../features/course/courseServiece";
import { useAppDispatch, useAppSelector } from "../../app/store";
import CouresCardSkeleton from "../../components/Skelitons/CouresCardSkeleton";
import CoruseCardUser from "../../components/CouresCardUser/CoruseCardUser";
import Skeleton from "@mui/material/Skeleton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "../../components/Footer/Footer";
import ShowCertificateModal from "../../components/Modal/ShowCertificateModal";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function HomPage() {
  const [search, setSearch] = useState<string>();
  const [certificateID, setCertificateID] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      navigate(`/courses?search=${search}`);
    }
  };

  const habdleVerifySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (certificateID) {
      setSubmit(true);
      setOpenModal(true);
    }
  };

  const couresSearch: ISearch = {
    category: "",
    language: "",
    page: "",
    search: "",
    sort: "popular",
  };
  useEffect(() => {
    dispatch(getAllCourses(couresSearch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const { isLoading, courses } = useAppSelector((state) => state.course);

  return (
    <>
      <ShowCertificateModal
        submit={submit}
        setSubmit={setSubmit}
        certificateID={certificateID}
        setCertificateID={setCertificateID}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <StudentNav />
      <div className="w-full flex flex-col items-center min-h-[100vh] bg-[#1e101c]">
        {!isLoading ? (
          <>
            <form
              onSubmit={handleSearch}
              className="w-full flex px-10 backdrop-blur-xl justify-center py-36 bg-[url('https://static.vecteezy.com/system/resources/previews/016/341/324/original/deep-dark-violet-neon-lights-watercolor-on-black-background-dark-purple-grungy-background-dark-purple-marble-texture-background-old-purple-paper-background-purple-stained-grungy-background-free-vector.jpg')] bg-no-repeat "
            >
              <div className="text-white shadow-2xl bg-[#2e1422] ring-[#662080] ring-1 flex w-96 items-center justify-between rounded-full">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  value={search}
                  placeholder="find courses"
                  className="rounded-s-full bg-[#1b0a1b] border-0 w-[90%] bg-transparent"
                />
                <button>
                  <SearchIcon className="me-2 " />
                </button>
              </div>
            </form>
            <h1 className="text-3xl font-bold text-gray-100 mt-4">
              POPULAR COURSES
            </h1>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <ThemeProvider theme={darkTheme}>
                <Skeleton width={1100} height={400} />
                <Skeleton width={400} height={50} />
              </ThemeProvider>
            </div>
          </>
        )}
        <div className="flex md:p-10 gap-6 p-3 items-center justify-center w-full flex-wrap">
          {isLoading && (
            <>
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
            </>
          )}
          {courses.length > 0 &&
            courses.map((e, i) => {
              return (
                <>
                  <CoruseCardUser
                    averageRating={e.averageRating}
                    course={e.course}
                    isEnrolled={e.isEnrolled}
                    key={i}
                    _id={e._id}
                  />
                </>
              );
            })}
          {courses.length === 0 && !isLoading && (
            <div className="">
              <h1>No courses</h1>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col text-center text-gray-200 items-center py-10  bg-[#301339]">
        <h1 className="text-5xl font-bold">Have Certificate?</h1>
        <h1 className="text-3xl">verify now</h1>
        <form
          onSubmit={habdleVerifySubmit}
          className="w-full flex px-10 backdrop-blur-xl justify-center"
        >
          <div className="text-white shadow-2xl bg-[#2e1422] ring-[#662080] my-4 ring-1 flex w-96 items-center justify-between rounded-full">
            <input
              onChange={(e) => setCertificateID(e.target.value)}
              type="text"
              value={certificateID}
              placeholder="Enter certificate ID eg:CERT6799367494"
              className="rounded-s-full px-5 bg-[#1b0a1b] border-0 w-[90%] bg-transparent"
            />
            <button>
              <SearchIcon className="me-2 " />
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
