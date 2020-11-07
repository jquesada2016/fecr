export type apiType = {
  user: string;
  pass: string;
  environment: "stag" | "prod";
  token?: string;
  refresh?: string;
  expires?: number;
  refreshExpires?: number;
};
