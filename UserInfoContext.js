import { createContext } from "react";

export const UserInfo = createContext({
  user: undefined,
  setUser: () => {},
});
