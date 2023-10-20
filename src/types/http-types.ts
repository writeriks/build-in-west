import { type IncomingMessage, type ServerResponse } from "http";

export type Request = IncomingMessage & {
  cookies: Partial<Record<string, string>>;
};
export type Response = ServerResponse<IncomingMessage>;
