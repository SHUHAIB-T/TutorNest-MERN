import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatDate } from "../../utils";
import Signature from "../../assets/Signature.svg";
import Logo from "../../assets/Logo.svg";
import api from "../../API/api";
import { ICerficate } from "../../types/enrollmentTypes";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader2/Loader";

type prop = {
  openModal: boolean;
  submit: boolean;
  certificateID: string;
  setCertificateID: Dispatch<SetStateAction<string>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setSubmit: Dispatch<SetStateAction<boolean>>;
};
export default function ShowCertificateModal({
  openModal,
  setOpenModal,
  submit,
  setSubmit,
  certificateID,
  setCertificateID,
}: prop) {
  const [loading, setLoading] = useState<boolean>(false);
  const [certifiacte, setCertificate] = useState<ICerficate>({});

  useEffect(() => {
    if (certificateID && submit) {
      (async function () {
        try {
          setLoading(true);
          const { data } = await api.post("certificate/verify", {
            ID: certificateID,
          });
          setSubmit(false);
          setLoading(false);
          console.log(data);
          setCertificate(data.certificate);
        } catch (err) {
          setSubmit(false);
          setLoading(false);
          toast.error("Something went wrong!");
        }
      })();
    }
  }, [certificateID, submit, setSubmit]);

  return (
    <>
      <Modal
        size="4xl"
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setCertificateID("");
          setSubmit(false);
        }}
      >
        <Modal.Header className="ring-1 ring-[#4d2389] bg-[#110d17]  rounded-t-md" />
        <Modal.Body className="ring-1 ring-[#4d2389] flex items-center justify-center space-y-6 flex-col bg-[#110d17] rounded-b-md">
          <div className="flex w-[800px] relative z-0 p-4 h-[400px] flex-col justify-center items-center">
            {loading && (
              <>
                <Loader />
              </>
            )}
            {!certifiacte?.ID && !loading && (
              <>
                <div className="text-gray-100 space-y-2 flex flex-col items-center justify-center text-center">
                  <h1 className="font-bold text-5xl">OOPS!</h1>
                  <small>
                    Certificate Not Found
                    <br /> Check whether the certificate ID is correct and try
                    again.
                  </small>
                </div>
              </>
            )}
            {certifiacte?.ID && !loading && (
              <>
                <div className="bg-white w-full h-full flex items-center justify-center rounded-lg">
                  <div className="w-full h-full font-medium rounded-lg">
                    <div className="bg-my-input flex flex-col items-center justify-center rounded-lg w-full h-[150px]">
                      <img src={Logo} className="w-28" alt="" />
                      <small className="mb-8 max-w-[400px] text-gray-200 text-center">
                        "Creating a world where learning is accessible to
                        everyone, everywhere."
                      </small>
                      <h1 className="text-yellow-300 text-2xl font-bold italic">
                        COMPLETION CERTFICATE
                      </h1>
                    </div>
                    <div className="flex flex-col h-[250px] items-center justify-start pt-8">
                      <h1>This certificate is hereby granted to</h1>
                      <h1 className="text-xl font-bold">
                        Ms./Mr. {certifiacte.user?.name}
                      </h1>
                      <h1>
                        for successfully completing the course{" "}
                        <span className="italic font-bold">
                          {certifiacte.course?.title}
                        </span>{" "}
                        from TutorNest.
                      </h1>
                    </div>
                  </div>
                  <div className="absolute bottom-10 right-28 flex items-center flex-col">
                    <img
                      src={Signature}
                      className=" w-32 mix-blend-darken"
                      alt=""
                    />
                    <small className="text-gray-900">Admin | TutorNest</small>
                  </div>
                  <div className="absolute bottom-10 left-28 flex items-start flex-col">
                    <small>
                      CRT NO :{" "}
                      <span className="font-bold">{certifiacte.ID}</span>
                    </small>
                    <small>
                      ISSUED : {formatDate(certifiacte.createdAt as string)}
                    </small>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
