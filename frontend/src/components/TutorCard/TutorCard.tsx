import VerifiedIcon from "@mui/icons-material/Verified";

export default function TutorCard() {
  return (
    <>
      <div className="w-64 flex flex-col relative text-center items-center justify-center h-fit ring-my-ring ring-1 rounded-lg p-3 bg-my-bg-dark text-white">
        <img
          src="https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png"
          alt=""
          className="w-28 rounded-full mt-3 border-2 border-violet-700"
        />
        <VerifiedIcon className="text-green-400" />
        <h1 className="font-bold text-3xl">Amarnath</h1>
        <small>passionate about teaching</small>
        <button className="bg-primary font-bold text-white w-full rounded-md my-2">
          CHAT
        </button>
        <span className="text-blue-600 cursor-pointer hover:underline absolute top-2 right-4">
          Rate?
        </span>
      </div>
    </>
  );
}
