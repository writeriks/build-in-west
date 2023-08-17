import { type User, UserType } from "@prisma/client";
import {
  type Auth0User,
  UserAuthenticationTypes,
  type FacebookUser,
  type GoogleUser,
} from "../../types";

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
      picture: user.picture,
      userType: UserType.AUTH0,
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
      userType: UserType.FACEBOOK,
    };
  };

  generateGoogleUser = (user: GoogleUser): Omit<User, "id" | "updated_at"> => {
    return {
      email: user.email,
      email_verified: user.email_verified,
      lastname: user.family_name,
      name: user.given_name,
      picture: user.picture,
      userType: UserType.GOOGLE,
    };
  };
}

const authenticationService = new AuthenticationService();
export default authenticationService;
