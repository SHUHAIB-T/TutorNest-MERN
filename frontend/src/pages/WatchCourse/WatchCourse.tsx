import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import StudentNav from "../../components/NavBar/StudentNav";
import { useNavigate, useParams } from "react-router-dom";
import { IEnrollments } from "../../types/enrollmentTypes";
import { getEntollments } from "../../features/enrollments/enrollmentServiece";
import ReactPlayer from "react-player/lazy";
import { styled } from "@mui/material/styles";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import api from "../../API/api";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RateCouresModal from "../../components/Modal/RateCouresModal";
import { Irating } from "../../types/ratingTypes";
import { formatDuration } from "../../utils";
import { ILesson } from "../../types/courseType";
import { toast } from "react-toastify";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#6358A9" : "#6358A9",
  },
}));

export default function WatchCourse() {
  const { enrollments } = useAppSelector((state) => state.enrollments);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentCoures, setCurrentCoures] = useState<IEnrollments>();
  const [currentVideo, setCurrentVideo] = useState<{
    id: string;
    video: string;
  }>({
    id: "",
    video: "",
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [ratings, setRatings] = useState<Irating[]>([]);
  const [currentRating, setCurrentRating] = useState<Irating>();
  const [rateCouresId, setRateCourseId] = useState<string>("");

  useEffect(() => {
    setCurrentCoures(enrollments.find((e) => e.courseId === id));
  }, [id, enrollments]);
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleInitialMobileCheck = () => {
        const width = window.innerWidth;
        setIsMobile(width <= 768);
      };
      handleInitialMobileCheck();
      const handleResize = () => {
        const width = window.innerWidth;
        setIsMobile(width <= 768); 
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [containerRef]);

  useEffect(() => {
    if (
      currentCoures &&
      currentCoures?.course.lessons &&
      currentCoures?.course.lessons.length > 0
    ) {
      setCurrentVideo({
        id: currentCoures?.course.lessons[0]._id as string,
        video: currentCoures?.course.lessons[0].video as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCoures]);

  useEffect(() => {
    dispatch(getEntollments());
  }, [dispatch]);

  useEffect(() => {
    if (!enrollments.find((e) => e.courseId === id)) {
      navigate("/student");
    }
  }, [currentCoures, navigate, id, enrollments]);
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get("rating/course");
        setRatings(data.ratings);
      } catch (_err) {
        toast.error("Error")
      }
    })();
  }, [updated]);

  const updateProgress = async (lessonId: string) => {
    try {
      const { data } = await api.post("/enrollment/update-progress", {
        courseId: currentCoures?.courseId,
        lessonId: lessonId,
      });
      if (data && currentCoures) {
        setCurrentCoures({
          ...currentCoures,
          completed: data.progress,
          isComplete: data.isComplete,
        });
      }
    } catch (_err) {
      toast.error("Error")
    }
  };
  return (
    <>
      <RateCouresModal
        setUpdated={setUpdated}
        currentRating={currentRating}
        openModal={openModal}
        setOpenModal={setOpenModal}
        rateCouresId={rateCouresId}
        setRateCouresId={setRateCourseId}
      />
      <ThemeProvider theme={darkTheme}>
        <div ref={containerRef} className="bg-my-bg-dark min-h-screen">
          <StudentNav />
          <BorderLinearProgress
            variant="determinate"
            value={
              currentCoures?.completed
                ? Math.floor(
                    (currentCoures.completed?.length /
                      (currentCoures.course.lessons as ILesson[]).length) *
                      100
                  )
                : 0
            }
          />
          <div className="flex flex-wrap py-5 w-full bg-my-bg-dark min-h-screen ">
            <div className=" w-full mt-11 md:w-7/12 flex items-center gap-4 h-fit flex-col ">
              <ReactPlayer
                controls
                pip
                url={currentVideo.video}
                onEnded={() => {
                  updateProgress(currentVideo?.id as string);
                }}
                {...(isMobile ? { width: "90%", height: "200px" } : null)}
              />
              {currentCoures?.isComplete && (
                <>
                  <div className="flex gap-3 my-2">
                    <button
                      onClick={() => {
                        setCurrentRating(
                          ratings.find(
                            (e) => e.courseId === currentCoures.courseId
                          )
                        );
                        setRateCourseId(currentCoures.courseId as string);
                        setOpenModal(true);
                      }}
                      className="bg-primary py-1 px-3 rounded-md text-gray-200"
                    >
                      Rate course
                    </button>
                    <button
                      onClick={() =>
                        navigate(
                          `/student/assessment/${currentCoures.courseId}`
                        )
                      }
                      className="bg-primary py-1 px-3 rounded-md text-gray-200"
                    >
                      Assessment
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="md:w-5/12 w-full md:px-10 px-3 h-screen flex flex-col items-center">
              <h1 className="font-bold text-4xl my-3 text-yellow-50">
                LESSONS
              </h1>
              <div className="w-full bg-mycard-body overflow-y-scroll rounded-xl mt-2 h-96">
                {currentCoures?.course.lessons &&
                  currentCoures?.course.lessons.map((e) => (
                    <>
                      <div
                        onClick={() => {
                          setCurrentVideo({
                            id: e._id as string,
                            video: e.video as string,
                          });
                        }}
                        className={`hover:bg-[#402757] cursor-pointer ${
                          currentVideo.id === e._id ? "bg-my-input" : ""
                        } flex items-center px-4 py-5 gap-3`}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <OndemandVideoIcon
                            className="text-gray-400"
                            fontSize={"large"}
                          />
                          <h1 className="text-gray-400">
                            {formatDuration(e.duration as unknown as number)}
                          </h1>
                        </div>
                        <div className="leading-tight">
                          <h1 className="text-gray-200 font-bold">{e.title}</h1>
                          <small className="text-gray-300">
                            {e.description}
                          </small>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
