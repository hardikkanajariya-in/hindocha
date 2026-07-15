// Redirect to route.tsx dynamically to resolve type checking
export async function GET() {
  return new Response("Not Found", { status: 404 });
}
