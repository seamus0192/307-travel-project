import axios from "axios";
import { type Prisma } from "@prisma/client";

const signupUser = async (user: Prisma.UserCreateInput): Promise<string> => {
  const { data } = await axios.post<string>(
    `${process.env.REACT_APP_API_URL}/user`,
    {
      username: user.username,
      password: user.password,
    },
  );

  return data;
};

const loginUser = async (user: Prisma.UserCreateInput): Promise<string> => {
  const { data } = await axios.put<string>(
    `${process.env.REACT_APP_API_URL}/user`,
    {
      username: user.username,
      password: user.password,
    },
  );

  return data;
};

export { signupUser, loginUser };
