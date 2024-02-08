import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { validate } from "../util/validateForms";
import { userData } from "../../types/authTypes";

type Props = {
  role: string;
};

export default function Signup({ role }: Props) {
  console.log(role);
  const [isviewPass, setIsviewPass] = useState(false);
  const viewPassword = () => {
    setIsviewPass((pre) => !pre);
  };

  const [userData, setUserData] = useState<userData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmpass, setconfirmpass] = useState<string>("");
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setconfirmpass(e.target.value);
  };

  const [formError, setFormError] = useState<userData>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({
      ...formError,
      name: validate("name", userData.name),
      email: validate("email", userData.email),
      phone: validate("phone", userData.phone),
      password: validate("password", userData.password),
    });
    if (formError.password === "" && confirmpass !== userData.password) {
      setFormError({
        ...formError,
        password: "password not matching",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end h-[100vh] md:pt-20 md:pb-10 md:px-52 sm:py-5 w-full">
        <div className="w-[100%] relative flex justify-between bg-white h-[100%] rounded-3xl">
          <div className="bg-primary h-[100%] w-80 left-20 hidden md:inline-flex rounded-3xl"></div>
          <div className="flex flex-col items-center w-[100%]">
            <h1 className="text-primary font-black text-5xl mt-9">SIGNUP</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start w-[70%]"
            >
              <label htmlFor="name" className="text-primary font-medium mt-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your Name"
                className="w-[100%] text-xs h-8 rounded-md"
                value={userData.name}
                onChange={handleChange}
              />
              {formError.name && (
                <small className="text-red-700">{formError.name}</small>
              )}
              <div className="grid grid-cols-2 justify-between w-[100%] gap-3 mt-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="text-primary font-medium mt-2"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="name"
                    placeholder="Enter your Email"
                    className="w-[100%] text-xs h-8 rounded-md"
                    value={userData.email}
                    onChange={handleChange}
                  />
                  {formError.email && (
                    <small className="text-red-700">{formError.email}</small>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="text-primary font-medium mt-2"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="name"
                    name="phone"
                    onChange={handleChange}
                    value={userData.phone}
                    placeholder="Enter your Phone Number"
                    className="w-[100%] text-xs h-8 rounded-md"
                  />
                  {formError.phone && (
                    <small className="text-red-700">{formError.phone}</small>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1 relative">
                  <label
                    htmlFor="name"
                    className="text-primary font-medium mt-2"
                  >
                    Password
                  </label>
                  <input
                    type={isviewPass ? "text" : "password"}
                    id="name"
                    name="password"
                    onChange={handleChange}
                    value={userData.password}
                    placeholder="Enter your password"
                    className="w-[100%] text-xs h-8 rounded-md"
                  />
                  {formError.password && (
                    <small className="text-red-700">{formError.password}</small>
                  )}
                  {isviewPass ? (
                    <RemoveRedEyeIcon
                      onClick={viewPassword}
                      className="absolute right-3 top-8 cursor-pointer"
                      sx={{ fontSize: 15 }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={viewPassword}
                      className="absolute right-3 top-8 cursor-pointer"
                      sx={{ fontSize: 15 }}
                    />
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="text-primary font-medium mt-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="name"
                    value={confirmpass}
                    onChange={onchange}
                    placeholder="Confirm Password"
                    className="w-[100%] text-xs h-8 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <button className="bg-primary py-2 w-[100%] rounded-md text-white text-base font-medium">
                    SUBMIT
                  </button>
                </div>
              </div>
              <Link to={"/login"} className="text-blue-500 text-sm mt-1">
                Already have account? login
              </Link>
            </form>
          </div>
          <img
            className="absolute hidden top-10 left-10 md:inline-flex"
            src="https://lh3.google.com/u/0/d/1ro0qQB_ADXEi2KRwzyxJ-xLjHvYpjHwC"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
