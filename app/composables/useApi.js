// Api call helper jest give endpoint name and payload
// const config = useRuntimeConfig()
// const domain = config.public.serverEnv === "developmentLocal"
// ? "http://localhost:3000/api/" : "https://pageby.me/api/"
export async function useApi(endpoint, payload) {
  const res = await fetch(`/api/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return await res.json();
}
