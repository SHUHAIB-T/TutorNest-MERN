import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import EditIcon from "@mui/icons-material/Edit";
import CropModal from "../Modal/CropModal";
import { uploadProfile } from "../../features/users/userServieces";

export default function ProfileCard() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.userProfile);
  const { user } = useAppSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState<File>();
  const [cropDone, setCropDone] = useState(false);
  useEffect(() => {
    if (cropDone && croppedImage) {
      dispatch(uploadProfile(croppedImage));
    }
  }, [cropDone, croppedImage, dispatch]);

  return (
    <>
      <CropModal
        setCroppedImage={setCroppedImage}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setCropDone={setCropDone}
      />
      <div className="flex bg-[#302343] shadow-md flex-wrap items-center justify-center w-full h-fit gap-7 ring-1 py-5 ring-[#4d2389] rounded-xl">
        <div className="img-wrapper relative">
          <img
            src={
              profile?.profile
                ? profile.profile
                : "https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png"
            }
            className="rounded-full w-40 ring-1 ring-[#9747FF] "
            alt=""
          />
          <div
            onClick={() => setOpenModal(true)}
            className="bg-[#372450] rounded-full text-[#9747FF] absolute  top-3 right-3 p-2 ring-1 ring-[#9747FF] cursor-pointer hover:shadow-lg"
          >
            <EditIcon />
          </div>
        </div>
        <div className="space-y-1 flex text-white text-xl flex-col  md:mr-16 justify-center md:justify-start">
          <h1 className="font-bold text-4xl">{profile?.name}</h1>
          <h1>{user?.email}</h1>
          <h1>{profile?.phone}</h1>
        </div>
      </div>
    </>
  );
}
