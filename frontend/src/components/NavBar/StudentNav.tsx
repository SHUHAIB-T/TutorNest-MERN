import { Dropdown, Navbar } from "flowbite-react";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { customTheme } from "../util/navCustomTheme";
import { Flowbite } from "flowbite-react";
import { logout } from "../../features/auth/authSlice";
import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { useEffect } from "react";
import { getStudentProfile } from "../../features/users/userServieces";
import { useLocation } from "react-router-dom";

export default function StudentNav() {
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.userProfile);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getStudentProfile());
  }, [dispatch]);

  return (
    <>
      <div className="sticky top-0 z-10">
        <Flowbite theme={{ theme: customTheme }}>
          <Navbar>
            <Navbar.Brand>
              <Link to={"/"}>
                <img src={Logo} className="mr-3 h-6 sm:h-9" />
              </Link>
            </Navbar.Brand>
            <div className="flex items-center md:order-2">
              <Link to={"/student/chat"}>
                <InsertCommentIcon className="text-white me-3" />
              </Link>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  profile?.profile ? (
                    <img
                      alt="User settings"
                      src={profile?.profile}
                      className="w-10 rounded-full border-2 border-violet-700"
                    />
                  ) : (
                    <img
                      alt="User settings"
                      src="https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png"
                      className="w-10 rounded-full border-2 border-violet-700"
                    />
                  )
                }
              >
                <>
                  <Dropdown.Header>
                    <span className="font-bold">{profile?.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {user?.email}
                    </span>
                  </Dropdown.Header>
                  <Link to={"/student/profile"}>
                    <Dropdown.Item>My Profile</Dropdown.Item>
                  </Link>
                  <Link to={"/student/posts"}>
                    <Dropdown.Item>My Posts</Dropdown.Item>
                  </Link>
                  <Dropdown.Item>My Courses</Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item onClick={() => dispatch(logout())}>
                    Sign out
                  </Dropdown.Item>
                </>
              </Dropdown>
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
              <Link to={"/student"}>
                <Navbar.Link active={location.pathname === "/student"}>Home</Navbar.Link>
              </Link>
              <Link to={"/courses"}>
                <Navbar.Link active={location.pathname === "/courses"}>Courses</Navbar.Link>
              </Link>
              <Navbar.Link href="#">Tutors</Navbar.Link>
              <Navbar.Link href="#">About</Navbar.Link>
            </Navbar.Collapse>
          </Navbar>
        </Flowbite>
      </div>
    </>
  );
}
