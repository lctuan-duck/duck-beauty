export default defineController(async (event) => {
  // Clear user session
  await clearUserSession(event);
});
