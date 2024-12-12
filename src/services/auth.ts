import { UserInterface } from "../interfaces";

export const checkSignUp = (user: UserInterface) => {
  if (!user.name || user.name.length < 3) {
    throw new Error("Name must have at least 3 characters");
  }
  if (!user.surname || user.surname.length < 3) {
    throw new Error("Surname must have at least 3 characters");
  }
  if (!user.email || user.surname.length < 3) {
    throw new Error("Email not valid");
  }
  if (!user.password || user.password.length < 6) {
    throw new Error("Password must contain at least 6 characters");
  }
  if (!user.role) {
    throw new Error("Role is required");
  } else if (user.role !== "ADMIN" && user.role !== "USER") {
    throw new Error("Role type is not valid");
  }
};
