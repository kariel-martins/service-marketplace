export interface IJwtData {
  scope?: string | number;
  purpose: string;
  role?: string;
  sub?: string;
}

export type JwtPayload = {
  sub: string;
  scope: string | number;
  role: "worker" | "client";
  purpose: string;
};
