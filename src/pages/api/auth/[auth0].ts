/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

import { createUser } from "../../../utils/db";
import authenticationService from "../../../service/authentication-service.ts/authentication-service";

import { type Session } from "../../../types";

const afterCallback = async (
  req: any,
  res: any,
  session: Session,
  state: any
) => {
  const { user } = session;
  const dbUser = authenticationService.generateUserByAuthenticationType(user);
  try {
    await createUser(dbUser);
  } catch (err) {
    console.log(err);
  }
  return session;
};

export default handleAuth({
  async callback(req: any, res: any) {
    try {
      //@ts-ignore
      await handleCallback(req, res, { afterCallback });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
