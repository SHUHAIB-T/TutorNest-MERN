import { Modal } from "flowbite-react";
import { SetStateAction, Dispatch, useState, useEffect } from "react";
import { ICourse } from "../../../types/courseType";
import { validate } from "../../util/validateForms";
import api from "../../../API/api";
import { storage } from "../../../app/fireabse";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAppSelector } from "../../../app/store";
import { toast } from "react-toastify";
import { deleteImageFromFirebase } from "../../util/uploadFirebase";

type Prop = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  initialstate: ICourse;
  setEditCourseId: Dispatch<SetStateAction<string>>;
  setInitialState: Dispatch<SetStateAction<ICourse>>;
  setUpdated: Dispatch<SetStateAction<boolean>>;
};
export default function EditCourseModal({
  openModal,
  setOpenModal,
  initialstate,
  setEditCourseId,
  setUpdated,
  setInitialState,
}: Prop) {
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState<ICourse>(initialstate);
  const [formError, setFormError] = useState<ICourse>(initialstate);
  const [image, setImage] = useState<File | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  useEffect(() => {
    setFormData(initialstate);
  }, [initialstate]);

  const onchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSubmit(false);
  };
  const handleFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFormError({
      ...formError,
      description: validate("required", formData.description),
      price: validate("required", formData.price),
      title: validate("required", formData.title),
      coverIMG: validate("required", formData.coverIMG),
      category: validate("required", formData.category),
      language: validate("required", formData.language),
    });
    setSubmit(true);
  };
  useEffect(() => {
    (async function () {
      if (
        !formError.coverIMG &&
        !formError.description &&
        !formError.price &&
        !formError.title &&
        formData.description &&
        formData.price &&
        formData.title &&
        submit
      ) {
        try {
          if (image) {
            await deleteImageFromFirebase(initialstate.coverIMG);
            const filename = new Date().getTime() + image.name;
            const storageRef = ref(storage, "converIMG/" + filename);
            const snapshot = await uploadBytes(storageRef, image);
            if (snapshot) {
              const url = await getDownloadURL(storageRef);
              await api.put(
                `/course/${initialstate._id}`,
                {
                  coverIMG: url,
                  title: formData.title,
                  description: formData.description,
                  price: formData.price,
                  teacherId: user?._id,
                  category: formData.category,
                  language: formData.language,
                },
                { withCredentials: true }
              );
              setOpenModal(false);
              toast.success("Course updated!");
              setUpdated((e) => !e);
              setSubmit(false);
              setEditCourseId("");
              setInitialState({
                title: "",
                coverIMG: "",
                description: "",
                price: "",
              });
            }
          } else {
            await api.put(
              `/course/${initialstate._id}`,
              {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                teacherId: user?._id,
                category: formData.category,
                language: formData.language,
                coverIMG: initialstate.coverIMG,
              },
              { withCredentials: true }
            );
            setOpenModal(false);
            toast.success("Course updated!");
            setEditCourseId("");
            setInitialState({
              title: "",
              coverIMG: "",
              description: "",
              price: "",
            });
            setUpdated((e) => !e);
            setSubmit(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formError, image, formData, submit, user, setOpenModal]);

  return (
    <div>
      <Modal
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditCourseId("");
          setInitialState({
            title: "",
            coverIMG: "",
            description: "",
            price: "",
          });
        }}
      >
        <Modal.Header className="ring-1 ring-[#4d2389] bg-[#110d17] rounded-t-md">
          <h1 className="text-white font-bold">Create Course</h1>
        </Modal.Header>
        <Modal.Body className="bg-[#110d17] ring-1 ring-[#4d2389] rounded-b-md">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="flex flex-col  md:col-span-1 col-span-2">
              <label htmlFor="title" className="py-2 text-white">
                Title
              </label>
              {formError.title && (
                <small className="text-red-600">{formError.title}</small>
              )}
              <input
                onChange={onchange}
                className="bg-[#251c32] text-white border-0 rounded-md"
                type="text"
                name="title"
                value={formData.title}
                placeholder="Enter the title of the course"
              />
            </div>
            <div className="flex flex-col   md:col-span-1 col-span-2">
              <label htmlFor="title" className="py-2 text-white">
                Price
              </label>
              {formError.price && (
                <small className="text-red-600">{formError.price}</small>
              )}
              <input
                className="bg-[#251c32] text-white border-0 rounded-md "
                type="number"
                name="price"
                value={formData.price}
                placeholder="Enter the price of the course"
                onChange={onchange}
              />
            </div>
            <div className="flex flex-col   md:col-span-1 col-span-2">
              <label htmlFor="title" className="py-2 text-white">
                Category
              </label>
              {formError.category && (
                <small className="text-red-600">{formError.category}</small>
              )}
              <select
                className="bg-[#251c32] text-white border-0 rounded-md"
                name="category"
                value={formData.category}
                onChange={onchange}
                id=""
              >
                {formData.category && (
                  <option value={formData.category}>{formData.category}</option>
                )}
                {formData.category !== "IT and Software" && (
                  <option value="IT and Software">IT and Software</option>
                )}
                {formData.category !== "Design" && (
                  <option value="Design">Design</option>
                )}
                {formData.category !== "Art" && (
                  <option value="Art">Art</option>
                )}
                {formData.category !== "Music" && (
                  <option value="Music">Music</option>
                )}
                {formData.category !== "Business" && (
                  <option value="Business">Business</option>
                )}
                {formData.category !== "Health and Fitness" && (
                  <option value="Health and Fitness">Health and Fitness</option>
                )}
              </select>
            </div>
            <div className="flex flex-col   md:col-span-1 col-span-2">
              <label htmlFor="title" className="py-2 text-white">
                Language
              </label>
              {formError.language && (
                <small className="text-red-600">{formError.language}</small>
              )}
              <select
                className="bg-[#251c32] text-white border-0 rounded-md"
                name="language"
                value={formData.language}
                onChange={onchange}
                id=""
              >
                {formData.language && (
                  <option value={formData.language}>{formData.language}</option>
                )}
                {formData.language !== "English" && (
                  <option value="English">English</option>
                )}
                {formData.language !== "Malayalam" && (
                  <option value="Malayalam">Malayalam</option>
                )}
                {formData.language !== "Hindi" && (
                  <option value="Hindi">Hindi</option>
                )}
              </select>
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="title" className="py-2 text-white">
                cover image
              </label>
              {formError.coverIMG && (
                <small className="text-red-600">{formError.coverIMG}</small>
              )}
              <input
                className="bg-[#251c32] text-white border-0 rounded-md "
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="col-span-2 w-full text-white">
              <label htmlFor="description">Description</label>
              {formError.description && (
                <small className="text-red-600">{formError.description}</small>
              )}
              <textarea
                className="w-full mt-4 rounded-md bg-[#251c32] border-0 py-2"
                rows={4}
                name="description"
                value={formData.description}
                onChange={onchange}
                id=""
              ></textarea>
            </div>
            <button
              onClick={handleFormSubmit}
              className="font-bold text-white px-4 py-2 bg-primary rounded-lg"
            >
              SUBMIT
            </button>
            <button
              onClick={() => setFormData(initialstate)}
              className="font-bold text-white px-4 py-2 bg-[#3f3b3b] rounded-lg"
            >
              Reset
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
