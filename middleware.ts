import { geolocation, next } from "@vercel/functions";

export const config = {
  matcher: ["/((?!api|assets|.*\\..*).*)"],
};

export default function middleware(request: Request) {
  const { country = "", region = "" } = geolocation(request);
  const value =
    country === "US" && region ? `US-${region}` : country || "UNKNOWN";

  return next({
    headers: {
      "Set-Cookie": `geo-region=${value}; Path=/; Max-Age=3600; SameSite=Lax`,
    },
  });
}
