import React, { createContext, useEffect, useState } from "react";
import { type User } from "@prisma/client";
import axios from "axios";

interface AuthContext {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const authContext = createContext<AuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser !== null ? JSON.parse(savedUser) : null;
  });

  const login = (user: User): void => {
    setUser(user);
  };

  const logout = (): void => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    }
  }, [user]);

  const authContextValue = {
    user,
    login,
    logout,
  };

  return (
    <authContext.Provider value={authContextValue}>
      {children}
    </authContext.Provider>
  );
};
