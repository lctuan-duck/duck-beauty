import * as bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error in hashPassword:", error);
    throw error;
  }
}

export async function comparePassword(
  password: string,
  hashed: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}
