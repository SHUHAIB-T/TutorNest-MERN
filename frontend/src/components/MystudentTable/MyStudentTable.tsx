import { Table } from "flowbite-react";
import { IMyStudents } from "../../types/tutorTypes";

interface PROP {
  students: IMyStudents[];
}

export default function MyStudentTable({ students }: PROP) {
  return (
    <div className="overflow-x-auto mytable w-[80%] mt-10">
      <Table>
        <Table.Head>
          <Table.HeadCell>SL No</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Class</Table.HeadCell>
          <Table.HeadCell>Intrests</Table.HeadCell>
          <Table.HeadCell>Subjects</Table.HeadCell>
          <Table.HeadCell>Language</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Connect</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {students.length > 0 &&
            students.map((e, i) => {
              return (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {i + 1}
                  </Table.Cell>
                  <Table.Cell>{e.name}</Table.Cell>
                  <Table.Cell>{e.phone}</Table.Cell>
                  <Table.Cell>{e.standard}</Table.Cell>
                  <Table.Cell>
                    {e.intrests?.map((e) => {
                      return <span>{e},</span>;
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    {e.subjects?.map((e) => {
                      return <span>{e},</span>;
                    })}
                  </Table.Cell>
                  <Table.Cell>{e.preffered_language}</Table.Cell>
                  <Table.Cell>
                    <button className="py-1 px-3 bg-primary text-white rounded-md">
                      CHAT
                    </button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}
