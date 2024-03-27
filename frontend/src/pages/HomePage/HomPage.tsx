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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function HomPage() {
  const [search, setSearch] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      navigate(`/courses?search=${search}`);
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
      <StudentNav />
      <div className="w-full flex flex-col items-center min-h-[100vh] bg-[#1e101c]">
        {!isLoading ? (
          <>
            <form
              onSubmit={handleSearch}
              className="w-full flex backdrop-blur-xl justify-center py-36 bg-[url('https://static.vecteezy.com/system/resources/previews/016/341/324/original/deep-dark-violet-neon-lights-watercolor-on-black-background-dark-purple-grungy-background-dark-purple-marble-texture-background-old-purple-paper-background-purple-stained-grungy-background-free-vector.jpg')] bg-no-repeat "
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
      <Footer />
    </>
  );
}
