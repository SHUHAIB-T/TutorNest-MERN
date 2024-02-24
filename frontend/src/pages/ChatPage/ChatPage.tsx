import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/ChatComponents/SideBar";
import Chatwindow from "../../components/ChatComponents/Chatwindow";

type Prop = {
  role: string;
};
export default function ChatPage({ role }: Prop) {
  return (
    <>
      <div className="bg-secondary pb-10">
        {role === "TUTOR" && <NavBar role="TUTOR" />}
        <div className="p-5 flex gap-6">
          <SideBar />
          <Chatwindow />
        </div>
      </div>
    </>
  );
}
