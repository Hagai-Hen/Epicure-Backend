import { UserInterface } from "../interfaces";
import User from "../models/User";
import { checkSignUp } from "../services/auth";
import bcrypt from "bcryptjs";
import generateToken from "../services/utils";

export const signUpHandler = async (user: UserInterface) => {
  if (!user) {
    throw new Error("User not exists");
  }

  checkSignUp(user);

  const uniqueCheck = await User.findOne({ email: user.email });
  if (uniqueCheck) {
    throw new Error("Email already exists, please try choose another");
  }

  const newUser = new User({
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
    role: user.role,
  });

  if (!newUser) {
    throw new Error("can't create new user");
  }

  await newUser.save();

  return newUser;
};

export const LoginHandler = async (email: string, password: string) => {
  const user = await User.findOne({
    email,
  });

  const isMatch = await bcrypt.compare(password, user?.password || "");
  if (!user || !isMatch) {
    throw new Error("Invalid username or password");
  }
  const token = generateToken(user?._id);

  return {user, token}
}
