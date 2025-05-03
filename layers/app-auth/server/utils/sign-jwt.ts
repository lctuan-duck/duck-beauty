import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function signJwt(
  payload: JWTPayload,
  optional?: {
    expiresIn?: string;
  }
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(optional?.expiresIn || "1h")
    .sign(secret);
}

export async function verifyJwt(token: string) {
  return jwtVerify(token, secret);
}
