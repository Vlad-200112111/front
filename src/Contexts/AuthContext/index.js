import { createContext } from "react";

export const AuthContext = createContext({
  roles: [],
  userId: '',
  token: '',
  email: '',
  name: '',
  lastname: '',
  patronymic: '',
  gender: '',
  logOut: () => {},
});
