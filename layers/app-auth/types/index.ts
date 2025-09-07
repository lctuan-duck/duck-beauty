export * from "./auth.res";
export * from "./auth.google";

export enum REQUEST_STATUS {
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
