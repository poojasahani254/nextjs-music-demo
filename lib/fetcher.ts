export default async function fetcher(
  url: string,
  data: any,
  method: "POST" | "GET" | "PATCH" | "DELETE"
) {
  return await fetch(`${window.location.origin}/api${url}`, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
