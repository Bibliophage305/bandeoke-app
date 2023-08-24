import password from "~/static/password.json";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (body.password === password.password) {
    return "login success";
  }
  setResponseStatus(event, 401);
  return "login failure";
});
