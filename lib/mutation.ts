import fetcher from "./fetcher";

export async function auth(
  mode: "signIn" | "signup",
  body: { email: string; password: string },
  method: "POST" | "GET" | "PATCH" | "DELETE"
) {
  return await fetcher(`/user/${mode}`, body, method);
}
