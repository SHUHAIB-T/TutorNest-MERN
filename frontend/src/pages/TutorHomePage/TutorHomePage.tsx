import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TutorPostCard from "../../components/TutorPostCard/TutorPostCard";
import { useEffect, useState } from "react";
import { IPosts } from "../../types/PostsTypes";
import api from "../../API/api";

export default function TutorHomePage() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isRequestSent, setIsRequestSent] = useState(false);
  
  useEffect(() => {
    (async function () {
      try {
        const response = await api.get("/tutor/posts", {
          withCredentials: true,
        });
        if (response.data) {
          setPosts(response.data.posts);
          setIsRequestSent(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isRequestSent]);

  return (
    <>
      <NavBar role="TUTOR" />
      <div className="flex justify-center relative w-full bg-secondary py-20">
        <div className="text-white shadow-2xl bg-[#2e1422] ring-[#662080] ring-1 flex w-96 items-center justify-between rounded-full">
          <input
            type="text"
            placeholder="find courses"
            className="rounded-s-full bg-[#1b0a1b] border-0 w-[90%] bg-transparent"
          />
          <button>
            <SearchIcon className="me-2 " />
          </button>
        </div>
      </div>
      <div className="w-full pb-12 gap-3 flex justify-center flex-wrap bg-secondary">
        <div className="card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]">
          <h1 className="font-bold text-4xl text-white">MY Profile</h1>
          <Link to={"/tutor/profile"}>
            <h1 className="absolute top-3 right-5  text-[#9747FF]">View</h1>
          </Link>
        </div>
        <div className="card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]">
          <h1 className="font-bold text-4xl text-white">MY Students</h1>
          <Link to={"/tutor/my-students"}>
            <h1 className="absolute top-3 right-5  text-[#9747FF]">View</h1>
          </Link>
        </div>
        <div className="card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]">
          <h1 className="font-bold text-4xl text-white">MY documents</h1>
          <Link to={"/tutor/documents"}>
            <h1 className="absolute top-3 right-5  text-[#9747FF]">View</h1>
          </Link>
        </div>
      </div>
      <div className="bg-[#302c35] flex flex-wrap justify-center md:justify-start gap-5 px-2 md:px-10  py-10">
        <div className="w-full flex justify-center">
          <h1 className="font-bold md:text-5xl text-center text-3xl text-white mb-5">
            STUDENT POSTS
          </h1>
        </div>
        {posts.map((e, i) => {
          return (
            <TutorPostCard
              setIsRequestSent={setIsRequestSent}
              budget={e.budget}
              description={e.description}
              language={e.language}
              profile={e.profile}
              subject={e.subject}
              title={e.title}
              key={i}
              reqStatus={e.reqStatus}
              studentId={e.studentId}
              isRequestSent={isRequestSent}
            />
          );
        })}
      </div>
    </>
  );
}
