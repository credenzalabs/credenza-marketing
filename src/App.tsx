import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ForDesigners from "./pages/ForDesigners";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/CookieBanner";
import { trackPageview } from "./lib/analytics";

function PageviewTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    trackPageview(pathname + search);
  }, [pathname, search]);
  return null;
}

function ConditionalCookieBanner() {
  const { pathname } = useLocation();
  const isPreview = pathname.startsWith("/preview");
  return isPreview ? <CookieBanner /> : null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageviewTracker />
      <Routes>
        {/* Hidden preview routes */}
        <Route path="/preview" element={<Home />} />
        <Route path="/preview/for-designers" element={<ForDesigners />} />
        {/* Public routes — splash page */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
      <ConditionalCookieBanner />
    </BrowserRouter>
  );
}
