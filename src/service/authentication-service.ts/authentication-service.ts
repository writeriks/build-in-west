import { type User, UserType } from "@prisma/client";
import {
  type Auth0User,
  UserAuthenticationTypes,
  type FacebookUser,
} from "../../types";

class AuthenticationService {
  generateUserByAuthenticationType = (user: Auth0User | FacebookUser) => {
    const auththenticationType = user.sub.split(
      "|"
    )[0] as UserAuthenticationTypes;

    switch (auththenticationType) {
      case UserAuthenticationTypes.FACEBOOK:
        return this.generateFaceBookUser(user as FacebookUser);
      /* case UserAuthenticationTypes.GOOGLE:
        return UserAuthenticationTypes.GOOGLE; */
      case UserAuthenticationTypes.AUTH0:
      default:
        return this.generateAuth0User(user as Auth0User);
    }
  };

  generateAuth0User = (user: Auth0User): User => {
    return {
      id: user.sid,
      email: user.email,
      email_verified: user.email_verified,
      lastname: "",
      name: user.name,
      picture: user.picture,
      updated_at: user.updated_at,
      userType: UserType.AUTH0,
    };
  };

  generateFaceBookUser = (user: FacebookUser): User => {
    return {
      id: user.sid,
      email: user.email,
      email_verified: user.email_verified,
      lastname: user.family_name,
      name: user.middle_name
        ? `${user.given_name} ${user.middle_name}`
        : user.given_name,
      picture: user.picture,
      updated_at: user.updated_at,
      userType: UserType.AUTH0,
    };
  };
}

const authenticationService = new AuthenticationService();
export default authenticationService;
