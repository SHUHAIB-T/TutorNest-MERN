import StudentNav from "../../components/NavBar/StudentNav";
import SearchIcon from "@mui/icons-material/Search";

export default function HomPage() {
  return (
    <>
      <StudentNav />
      <div className="w-full h-[100vh] bg-[#1e101c]">
        <form className="w-full flex backdrop-blur-xl justify-center py-36 bg-[url('https://static.vecteezy.com/system/resources/previews/016/341/324/original/deep-dark-violet-neon-lights-watercolor-on-black-background-dark-purple-grungy-background-dark-purple-marble-texture-background-old-purple-paper-background-purple-stained-grungy-background-free-vector.jpg')] bg-no-repeat ">
          <div className="text-white shadow-2xl bg-[#2e1422] ring-[#662080] ring-1 flex w-96 items-center justify-between rounded-full">
            <input
              type="text"
              placeholder="find courses"
              className="rounded-s-full bg-[#1b0a1b] border-0 w-[90%] bg-transparent"
            />
            <button>
              <SearchIcon className="me-2 " />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
