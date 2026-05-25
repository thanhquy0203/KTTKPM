import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(savedUser || null);

  const loginUser = (userData) => {
  setUser(userData); // {id, username, role}
  localStorage.setItem("user", JSON.stringify(userData));
};

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}