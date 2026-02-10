
export interface IJwtData {
  scope?: string;
  purpose: string;
  role?: string,
  sub?: string;
}

export type JwtPayload = {
  sub: string;
  scope: string;
  role: "admin" | "manager" | "staff";
  purpose: "ACCESS_TOKEN" | "REFRESH_TOKEN";
};
