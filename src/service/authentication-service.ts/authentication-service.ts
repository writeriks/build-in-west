import { type User, UserType, PrismaClient } from "@prisma/client";
import {
  type Auth0User,
  UserAuthenticationTypes,
  type FacebookUser,
  type GoogleUser,
} from "../../types/user-types";
import { getSession } from "@auth0/nextjs-auth0";
import { type Request, type Response } from "../../types/http-types";

class AuthenticationService {
  generateUserByAuthenticationType = (
    user: Auth0User | FacebookUser | GoogleUser
  ) => {
    const auththenticationType = user.sub.split(
      "|"
    )[0] as UserAuthenticationTypes;

    switch (auththenticationType) {
      case UserAuthenticationTypes.FACEBOOK:
        return this.generateFaceBookUser(user as FacebookUser);
      case UserAuthenticationTypes.GOOGLE:
        return this.generateGoogleUser(user as GoogleUser);
      case UserAuthenticationTypes.AUTH0:
      default:
        return this.generateAuth0User(user as Auth0User);
    }
  };

  generateAuth0User = (user: Auth0User): Omit<User, "id" | "updated_at"> => {
    return {
      email: user.email,
      email_verified: user.email_verified,
      lastname: "",
      name: user.name,
      userStocksOrder: "",
      picture: user.picture,
      userType: UserType.AUTH0,
      isAdmin: user.isAdmin,
    };
  };

  generateFaceBookUser = (
    user: FacebookUser
  ): Omit<User, "id" | "updated_at"> => {
    return {
      email: user.email,
      email_verified: user.email_verified,
      lastname: user.family_name,
      name: user.middle_name
        ? `${user.given_name} ${user.middle_name}`
        : user.given_name,
      picture: user.picture,
      userStocksOrder: "",
      userType: UserType.FACEBOOK,
      isAdmin: user.isAdmin,
    };
  };

  generateGoogleUser = (user: GoogleUser): Omit<User, "id" | "updated_at"> => {
    return {
      email: user.email,
      email_verified: user.email_verified,
      lastname: user.family_name,
      name: user.given_name,
      picture: user.picture,
      userStocksOrder: "",
      userType: UserType.GOOGLE,
      isAdmin: user.isAdmin,
    };
  };

  getUserWithSession = async (req: Request, res: Response) => {
    const session = await getSession(req, res);
    const prisma = new PrismaClient();
    const dbUser = await prisma.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    await prisma.$disconnect();
    return dbUser;
  };
}

const authenticationService = new AuthenticationService();
export default authenticationService;
