import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import CoruseCardUser from "../../components/CouresCardUser/CoruseCardUser";
import FilterBarCourse from "../../components/FilterBarCourse/FilterBarCourse";
import StudentNav from "../../components/NavBar/StudentNav";
import CouresCardSkeleton from "../../components/Skelitons/CouresCardSkeleton";
import { Pagination } from "flowbite-react";
import { ISearch } from "../../types/courseType";

export default function CoursesPage() {
  const { isLoading, courses, count } = useAppSelector((state) => state.course);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<ISearch>({
    category: "",
    language: "",
    page: "",
    search: "",
    sort: "",
  });
  const onPageChange = (page: number) => setCurrentPage(page);
  useEffect(() => {
    if (currentPage >= 1) {
      setSearch({
        ...search,
        page: currentPage.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      <StudentNav />
      <div className="flex flex-wrap bg-secondary flex-col w-full min-h-screen text-gray-200">
        <FilterBarCourse search={search} setSearch={setSearch} />
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
                  />
                </>
              );
            })}
          {courses.length === 0 && (
            <div className="">
              <h1>No courses</h1>
            </div>
          )}
          {count > 0 && (
            <div className="flex mypage overflow-x-auto w-[80%] sm:justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={count}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
