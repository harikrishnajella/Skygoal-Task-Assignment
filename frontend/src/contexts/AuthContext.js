import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const loggedUser = (userData) => {
    setUser(userData);
  };


  return (
    <AuthContext.Provider value={{ user, loggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
