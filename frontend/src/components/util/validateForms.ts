function allDigitsSame(phoneNumber: number | string) {
  phoneNumber = phoneNumber.toString();
  const digits = phoneNumber.replace(/\D/g, "");
  return new Set(digits).size === 1;
}

export const validate = (name: string, value: unknown): string => {
  const email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  switch (name) {
    case "email":
      if (value === "") {
        return "Email is resquired!";
      } else if (typeof value === "string" && !value.match(email)) {
        return "Invalid Email address!";
      }
      return "";
    case "name":
      if (value === "") return "name is required!";
      if ((value as string).length > 15) return "Maximum 15 charecter!";
      return "";
    case "phone":
      if (value === "" || !value) return "Phone is required!";
      if ((value as string).length !== 10) return "Invalid phone number!";
      if (allDigitsSame(value as string | number))
        return "Invalid phone number!";
      return "";
    case "password":
      if (!value || value === "") return "Password is required!";
      if ((value as string).length < 6)
        return "Password must contain 6 charecters";
      if ((value as string).length > 16) return "Maximum 16 charecters!";
      return "";
    case "passwordLogin":
      if (!value || value === "") return "Password is required!";
      return "";
    case "dob":
      if (!value || value === "") return "Dob required!";
      return "";
    case "preffered_language":
      if (!value || value === "") return "* required!";
      return "";
    case "gender":
      if (!value || value === "") return "* required!";
      return "";
    case "class":
      if (!value || value === "") return "* required!";
      return "";
    case "intrests":
      if (!value || (value as string[]).length === 0) return "* required!";
      return "";
    case "subjects":
      if (!value || (value as string[]).length === 0) return "* required!";
      return "";
  }
  return "";
};
