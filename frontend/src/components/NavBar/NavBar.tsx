import { Dropdown, Navbar } from "flowbite-react";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { customTheme } from "../util/navCustomTheme";
import { Flowbite } from "flowbite-react";
import { logout } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
export default function NavBar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <Navbar>
          <Navbar.Brand>
            <img
              src="https://lh3.google.com/u/0/d/1Jzrm6IwLPRxwyeT7rylfk_ofebafkSsl"
              className="mr-3 h-6 sm:h-9"
            />
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                user ? (
                  <img
                    alt="User settings"
                    src="https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png"
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
              {user ? (
                <>
                  <Dropdown.Header>
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item onClick={() => dispatch(logout())}>
                    Sign out
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Link to={"/login"}>
                    <Dropdown.Item>Login</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Link to={"/tutor/signup"}>
                    <Dropdown.Item>Signup as Tutor</Dropdown.Item>
                  </Link>
                  <Link to={"/tutor/signup"}>
                    <Dropdown.Item>Signup as Student</Dropdown.Item>
                  </Link>
                </>
              )}
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </Flowbite>
    </>
  );
}
