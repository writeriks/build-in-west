import { type User } from "@prisma/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAdminUser } from "../store/reducers/context-slice/context-slice";

const useSetAdminUser = (dbUser: User) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (dbUser.isAdmin) {
      dispatch(setIsAdminUser(dbUser.isAdmin as boolean));
    }
  }, [dbUser.isAdmin, dispatch]);
};

export default useSetAdminUser;
