import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAppSelector } from "../../app/store";
import { useNavigate } from "react-router-dom";

export default function VideoRoom() {
  const navigate = useNavigate();
  const { profile } = useAppSelector((state) => state.userProfile);
  const { id } = useParams();
  const myMeeting = async (element: HTMLDivElement) => {
    const appID = 462450910;
    const serverSecret = "23ce8ba01ffe3c56eb0373568ecc0f22";
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
