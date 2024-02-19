import NavBar from "../../components/NavBar/NavBar";
import AdminSideBar from "../../components/AdminSidebar/AdminSideBar";

export default function AdminHome() {
  return (
    <>
      <NavBar role="TUTOR" />
      <div className="flex md:p-10 p-4 w-full h-[100vh] bg-secondary">
        <AdminSideBar />
        
      </div>
    </>
  );
}
