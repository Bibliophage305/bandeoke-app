export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (body.password === process.env.PASSWORD) {
    return "login success";
  }
  setResponseStatus(event, 401);
  return "login failure";
});
