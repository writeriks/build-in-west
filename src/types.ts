import { type UserProfile } from "@auth0/nextjs-auth0/client";

export interface Auth0User extends UserProfile {
  sid: string;
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}
export interface FacebookUser extends UserProfile {
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  middle_name: string;
  family_name: string;
  nickname: string;
  picture: string;
  sid: string;
  sub: string;
  updated_at: string;
}

export type DatabaseUser = Auth0User | FacebookUser | UserProfile;

export enum UserAuthenticationTypes {
  AUTH0 = "auth0",
  GOOGLE = "google-oauth2",
  FACEBOOK = "facebook",
}
