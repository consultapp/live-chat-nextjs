import USER_TYPE from "@/fixtures/USER_TYPE";
import { Dispatch, SetStateAction, createContext } from "react";
import { IUser } from "../../types";

interface IInitialUserContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

export const initialUserContext: IInitialUserContext = {
  user: { userType: USER_TYPE.user },
  setUser: () => {},
};

export const UserContext = createContext(initialUserContext);
