import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAppSelector } from "../../app/store";
import { useNavigate } from "react-router-dom";

export default function VideoRoom() {
  const navigate = useNavigate();
  const { profile } = useAppSelector((state) => state.userProfile);
  const { id } = useParams();
  console.log(profile);
  const myMeeting = async (element: HTMLDivElement) => {
    const appID = 854451168;
    const serverSecret = "651b7b8df5acba76c4c8b7bc52b6c0cd";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      id ? id : "",
      Date.now().toString(),
      profile?.name
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };
  return (
    <div className="flex w-full flex-col h-screen justify-center items-center">
      <div ref={myMeeting} />
      <button
        onClick={() => navigate(-1)}
        className="bg-primary text-white mt-10 px-4 py-2 rounded"
      >
        Back to chat
      </button>
    </div>
  );
}
