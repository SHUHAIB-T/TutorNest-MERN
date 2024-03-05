import { Modal } from "flowbite-react";
import { SetStateAction, Dispatch, useState } from "react";

type Prop = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
};
export default function CreateCourseModal({ openModal, setOpenModal }: Prop) {
  const [formData, setFormData] = useState();
  
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
              <input
                className="bg-[#251c32] text-white border-0 rounded-md"
                type="text"
                name="title"
                placeholder="Enter the title of the course"
              />
            </div>
            <div className="flex flex-col   md:col-span-1 col-span-2">
              <label htmlFor="title" className="py-2 text-white">
                Price
              </label>
              <input
                className="bg-[#251c32] text-white border-0 rounded-md "
                type="text"
                name="price"
                placeholder="Enter the price of the course"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="title" className="py-2 text-white">
                cover image
              </label>
              <input
                className="bg-[#251c32] text-white border-0 rounded-md "
                type="file"
                accept="image/*"
              />
            </div>
            <div className="col-span-2 w-full text-white">
              <label htmlFor="description">Description</label>
              <textarea
                className="w-full mt-4 rounded-md bg-[#251c32] border-0 py-2"
                rows={4}
                name="description"
                id=""
              ></textarea>
            </div>
            <button className="font-bold text-white px-4 py-2 bg-primary rounded-lg">
              SUBMIT
            </button>
            <button className="font-bold text-white px-4 py-2 bg-[#3f3b3b] rounded-lg">
              CLEAR
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
