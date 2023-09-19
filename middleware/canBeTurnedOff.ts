export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data, pending, error, refresh } = await useFetch("/api/signup/isopen");
  if (data.value && to.path === "/closed") {
    return navigateTo("/");
  }
  if (!data.value && to.path !== "/closed") {
    return navigateTo("/closed");
  }
});
