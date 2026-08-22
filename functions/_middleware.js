export async function onRequest(context) {
  const response = await context.next();

  const url = new URL(context.request.url);
  const path = url.pathname;

  const headers = new Headers(response.headers);

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-XSS-Protection", "1; mode=block");

  if (path.startsWith("/.well-known/")) {
    headers.set("Access-Control-Allow-Origin", "*");
  }

  if (path.startsWith("/images/") && path.endsWith(".pdf")) {
    headers.set("X-Frame-Options", "SAMEORIGIN");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
