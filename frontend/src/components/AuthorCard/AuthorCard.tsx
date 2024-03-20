import { useAppSelector } from "../../app/store";

export default function AuthorCard() {
  const { isLoading, course } = useAppSelector((state) => state.courseDetail);
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="w-96 h-fit px-5 py-5 mt-14 rounded-lg flex flex-col justify-center items-center ring-my-ring ring-1 bg-mycard-body">
            <h1 className="font-bold text-2xl">Author</h1>
            <div className="w-full h-1 bg-white/[0.1] my-3"></div>
            <div className="flex items-center gap-3">
              <img
                src={
                  course?.course?.author?.profile
                    ? course.course.author.profile
                    : "https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png"
                }
                className="w-32 h-32 rounded-full ring-1 ring-my-ring object-cover"
                alt=""
              />
              <div className="flex flex-col">
                <h1 className="font-bold text-xl">
                  {course?.course?.author?.name}
                </h1>
                <small>{course?.course?.author?.bio}</small>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
