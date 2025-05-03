import { registerAccount } from "#app-auth/server/services/auth";
import { USER_ROLE } from "#app-auth/server/dtos/auth.dto";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(100),
  fullName: z.string().min(3).max(100).optional(),
  phone: z.string().min(9).max(10).optional(),
});

export default defineController(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  const data = await registerAccount({
    ...body,
    role: USER_ROLE.USER,
  });
  return data;
});
