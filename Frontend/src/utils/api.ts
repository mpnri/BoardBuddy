const EndPoint = "http://localhost:3005/";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestFunction<Req, Res> {
  (requestBody: Req): Promise<Res>;
}

export function callRequest(
  subUrl: string,
  method: RequestMethod,
  body?: object
) {
  console.log(`Req (${subUrl}, ${method})`);
  return fetch(EndPoint + subUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${"jwtToken"}`,
    },
    // mode
    body: JSON.stringify(body),
    credentials: "include",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    res.text().then((v) => {
      console.error(`Req (${subUrl}, ${method}):`, JSON.parse(v));
    });
    throw res.statusText;
  });
}
