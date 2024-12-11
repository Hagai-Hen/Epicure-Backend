import { UserInterface } from "../interfaces";
import User from "../models/User";
import { checkCreateUser } from "../services/users";

export const createUserHandler = async (
    user: UserInterface
  ) => {
    if (!user) {
      throw new Error("User not exists");
    }
  
    checkCreateUser(user);

    //TODO: decrypt password (additional service)
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
  