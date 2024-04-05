import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";
import Cirtificate from "../Cirtificate/Cirtificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type prop = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  courseId: string | undefined;
};
export default function ViewCertificateModal({
  openModal,
  courseId,
  setOpenModal,
}: prop) {
  const handleDownloadPDF = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const input = document.getElementById("certificate-downoad");

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("certifiacte.pdf");
      });
    }
  };
  return (
    <>
      <Modal size="6xl" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="flex items-center justify-center flex-col">
            <div id="certificate-downoad">
              <Cirtificate courseId={courseId} />
            </div>
            <button
              onClick={handleDownloadPDF}
              className="bg-primary text-gray-100 my-4 py-2 px-4 rounded-md"
            >
              Download now
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
