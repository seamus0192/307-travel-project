import axios from "axios";
import { type Prisma } from "@prisma/client";

const signupUser = async (user: Prisma.UserCreateInput) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/user`, {
    username: user.username,
    password: user.password,
  });

  return response.data;
};

const loginUser = async (user: Prisma.UserCreateInput) => {
  const response = await axios.put("travel-hub.azurewebsites.net/user", {
    username: user.username,
    password: user.password,
  });

  return response.data;
};

export { signupUser, loginUser };
