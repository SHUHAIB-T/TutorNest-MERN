import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import StudentNav from "../../components/NavBar/StudentNav";
import StudentSideBar from "../../components/StudentSideBar/StudentSideBar";
import { getStudentPosts } from "../../features/studentPosts/StudentPostsService";
import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";
import CreatePostModal from "../../components/Modal/CreatePostModal";

export default function StudentPosts() {
  const { isLoading, posts } = useAppSelector((state) => state.studentPosts);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStudentPosts());
  }, [dispatch]);

  return (
    <>
      <CreatePostModal openModal={openModal} setOpenModal={setOpenModal} />
      <StudentNav />
      <div className="flex md:px-10 md:pt-10 md:pb-44  p-4 gap-10 bg-secondary">
        <StudentSideBar />
        <div className="flex-flex-col space-y-5">
          <button
            onClick={() => setOpenModal(true)}
            className=" bg-primary px-5 py-1 rounded-md font-bold text-white"
          >
            New Post
          </button>
          <div className="flex flex-wrap gap-5">
            {isLoading ? (
              <Loader />
            ) : (
              posts.length > 0 &&
              posts.map((e) => {
                return (
                  <>
                    <PostCard
                      subject={e.subject}
                      title={e.title}
                      budget={e.budget}
                      language={e.language}
                      description={e.description}
                    />
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
