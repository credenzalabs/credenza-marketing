import { geolocation, next } from "@vercel/functions";

import { geoRegionValue } from "./src/lib/geoRegion";

export const config = {
  matcher: ["/((?!api|assets|.*\\..*).*)"],
};

export default function middleware(request: Request) {
  const geo = geolocation(request);

  // `geo.countryRegion` is the visitor's ISO 3166-2 subdivision. `geo.region`
  // — which this used to read — is the Vercel edge location that served the
  // request, so the cookie carried "US-iad1" and matched no jurisdiction.
  const value = geoRegionValue({
    country: geo.country,
    countryRegion: geo.countryRegion,
  });

  return next({
    headers: {
      "Set-Cookie": `geo-region=${value}; Path=/; Max-Age=3600; SameSite=Lax; Secure`,
    },
  });
}
