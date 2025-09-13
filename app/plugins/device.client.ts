import { useGenerateDeviceId } from "~/composables/use-device";

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const deviceCookie = useCookie("device-id", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 năm
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    if (!deviceCookie.value) {
      deviceCookie.value = useGenerateDeviceId();
    }
  }
});
