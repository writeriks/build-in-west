import { useUser } from "@auth0/nextjs-auth0/client";
import { type User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { api } from "../utils/api";

const useSession = () => {
  const { user, isLoading, error } = useUser();
  const userMutation = api.user.getUser.useMutation({});

  const [session, setSession] = useState<User | null>(null);
  const didSuccedFetching = useRef(false);

  useEffect(() => {
    const getUserByMail = async (email: string) => {
      const user = await userMutation.mutateAsync({ email });
      setSession(user);
    };
    if (!isLoading && !error && user && !didSuccedFetching.current) {
      void getUserByMail(user.email!);
      didSuccedFetching.current = true;
    }
  }, [error, isLoading, user, userMutation]);

  return session;
};

export default useSession;
