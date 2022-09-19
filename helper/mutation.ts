import fetcher from "./fetcher";

export async function auth(
  mode: "signIn" | "signup" | "favorite/create",
  body: any,
  method: "POST" | "GET" | "PATCH" | "DELETE"
) {
  return await fetcher(`/user/${mode}`, body, method);
}
