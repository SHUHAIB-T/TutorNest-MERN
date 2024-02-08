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
      return "";
  }
  return "";
};
