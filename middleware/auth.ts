export default defineNuxtRouteMiddleware(async (to, from) => {
  const password = useCookie("password", {
    default: () => "",
    maxAge: 604800,
  });
  const { data, pending, error, refresh } = await useFetch("/api/auth", {
    method: "post",
    body: {
      password: password.value,
    },
  });
  if (error.value !== null && to.path !== "/admin/login") {
    return navigateTo("/admin/login");
  }
  if (error.value === null && to.path === "/admin/login") {
    return navigateTo("/admin");
  }
});
