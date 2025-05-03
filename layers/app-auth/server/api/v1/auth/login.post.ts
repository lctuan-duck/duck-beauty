import { loginAccount } from "#app-auth/server/services/auth";
import { z } from "zod";

const bodySchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(100),
});

export default defineController(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  const data = await loginAccount(body);
  return data;
});
