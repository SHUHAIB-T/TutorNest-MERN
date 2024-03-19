import { Modal } from "flowbite-react";
import { SetStateAction, Dispatch, useState, useEffect } from "react";
import { ICourse } from "../../../types/courseType";
import { validate } from "../../util/validateForms";
import api from "../../../API/api";
import { storage } from "../../../app/fireabse";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAppSelector } from "../../../app/store";
import { toast } from "react-toastify";

type Prop = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
};
export default function CreateCourseModal({ openModal, setOpenModal }: Prop) {
  const { user } = useAppSelector((state) => state.auth);
  const initialState: ICourse = {
    title: "",
    coverIMG: "",
    description: "",
    price: "",
    category: "",
    language: "",
  };
  const [formData, setFormData] = useState<ICourse>(initialState);
  const [formError, setFormError] = useState<ICourse>(initialState);
  const [image, setImage] = useState<File | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);

  const onchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.currentTarget;
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
      coverIMG: validate("required", image),
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
        !formError.category &&
        !formError.language &&
        image &&
        formData.description &&
        formData.price &&
        formData.title &&
        formData.category &&
        formData.language &&
        submit
      ) {
        try {
          const filename = new Date().getTime() + image.name;
          const storageRef = ref(storage, "converIMG/" + filename);
          const snapshot = await uploadBytes(storageRef, image);
          if (snapshot) {
            const url = await getDownloadURL(storageRef);
            const { data } = await api.post(
              "/course",
              {
                coverIMG: url,
                title: formData.title,
                description: formData.description,
                price: formData.price,
                language: formData.language,
                category: formData.category,
                teacherId: user?._id,
              },
              { withCredentials: true }
            );
            console.log(data);
            setOpenModal(false);
            toast.success("Course Created!");
            setFormData(initialState);
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
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
                <option value=""></option>
                <option value="IT and Software">IT and Software</option>
                <option value="Design">Design</option>
                <option value="Art">Art</option>
                <option value="Music">Music</option>
                <option value="Business">Business</option>
                <option value="Health and Fitness">Health and Fitness</option>
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
                <option value=""></option>
                <option value="English">English</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Hindi">Hindi</option>
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
              onClick={() => setFormData(initialState)}
              className="font-bold text-white px-4 py-2 bg-[#3f3b3b] rounded-lg"
            >
              CLEAR
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
