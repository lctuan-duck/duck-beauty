import { logout } from "#app-auth/server/services/auth";

export default defineController(async (event) => {
  // Require a user session (send back 401 if no `user` key in session)
  const session = await requireUserSession(event);

  await logout(session.user.id);
});
