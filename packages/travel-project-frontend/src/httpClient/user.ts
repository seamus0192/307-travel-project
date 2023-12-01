import axios from "axios";
import { type User, type Prisma } from "@prisma/client";

const signupUser = async (user: Prisma.UserCreateInput): Promise<User> => {
  const { data } = await axios.post<User>(
    `${process.env.REACT_APP_API_URL}/user`,
    {
      username: user.username,
      password: user.password,
    },
  );

  return data;
};

const loginUser = async (user: Prisma.UserCreateInput): Promise<User> => {
  const { data } = await axios.put<User>(
    `${process.env.REACT_APP_API_URL}/user`,
    {
      username: user.username,
      password: user.password,
    },
  );

  return data;
};

export { signupUser, loginUser };
