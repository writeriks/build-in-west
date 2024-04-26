import { type UserProfile } from "@auth0/nextjs-auth0/client";

export interface Session {
  accessToken: string;
  user: Auth0User | FacebookUser;
}

export interface Auth0User extends UserProfile {
  sid: string;
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
  isAdmin: boolean;
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
  isAdmin: boolean;
}
export interface GoogleUser extends UserProfile {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
  sid: string;
  isAdmin: boolean;
}

export type DatabaseUser = Auth0User | FacebookUser | UserProfile;

export enum UserAuthenticationTypes {
  AUTH0 = "auth0",
  GOOGLE = "google-oauth2",
  FACEBOOK = "facebook",
}
