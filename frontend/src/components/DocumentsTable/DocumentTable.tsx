import "./documets.css";
import { Table } from "flowbite-react";
import { DocumentType } from "../Documents/Documents";
import ShowImage from "../Modal/ShowImage";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import api from "../../API/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type prop = {
  setDocuments: Dispatch<SetStateAction<DocumentType[]>>;
  documents: DocumentType[];
};

export default function DocumentTable({ documents, setDocuments }: prop) {
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState("");
  const [deleteIMG, setDeleteIMG] = useState("");

  const viewImage = (img: string) => {
    setImage(img);
  };
  const deleteDocument = (id: string) => {
    setDeleteIMG(id);
  };

  useEffect(() => {
    (async function () {
      if (deleteIMG) {
        try {
          const response = await api.patch(
            "/tutor/deletedocument",
            { id: deleteIMG },
            { withCredentials: true }
          );
          if (response) {
            setDeleteIMG("");
            setDocuments(documents.filter((e) => e._id !== deleteIMG));
            toast.success("Document deleted!");
          }
        } catch (error) {
          const axioserror = error as AxiosError;
          toast.error(axioserror.message);
        }
      }
    })();
  }, [deleteIMG, documents, setDocuments]);

  useEffect(() => {
    if (image) {
      setOpenModal(true);
    }
  }, [setOpenModal, image]);

  return (
    <div className="overflow-x-auto documents w-[80%] mt-10">
      <ShowImage
        setImage={setImage}
        opentModal={openModal}
        setOpenModal={setOpenModal}
        url={image}
      />
      <Table>
        <Table.Head>
          <Table.HeadCell>SL No</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Uploaded On</Table.HeadCell>
          <Table.HeadCell>Document</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Eidi/delet</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {documents.length > 0 &&
            documents.map((e, i) => {
              return (
                <>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {i + 1}
                    </Table.Cell>
                    <Table.Cell>{e.name}</Table.Cell>
                    <Table.Cell>{e.createdAt}</Table.Cell>
                    <Table.Cell>
                      {e.isVerified ? (
                        <span>Verified</span>
                      ) : (
                        <span className="text-red-600">not verified</span>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => viewImage(e.document)}
                        className="font-medium cursor-pointer text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        View
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="font-medium  cursor-pointer text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                      </span>
                      <span
                        onClick={() => deleteDocument(e._id)}
                        className="font-medium ms-5 cursor-pointer text-red-600 hover:underline dark:text-red-500"
                      >
                        delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}
