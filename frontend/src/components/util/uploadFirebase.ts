import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../app/fireabse";

export const uploadImage = async (file: File): Promise<string> => {
  const filename = new Date().getTime() + file.name;
  const storageRef = ref(storage, "images/" + filename);
  const snapshot = await uploadBytes(storageRef, file);
  if (snapshot) {
    const url = await getDownloadURL(storageRef);
    return url;
  }
  return "";
};

export const deleteImageFromFirebase = async (
  url: string
): Promise<boolean> => {
  const imageRef = ref(storage, url);
  deleteObject(imageRef)
    .then(() => {
      console.log("old image deleted");
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return false;
};
