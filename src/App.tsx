import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ForDesigners from "./pages/ForDesigners";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CookieBanner from "./components/CookieBanner";
import { trackPageview } from "./lib/analytics";

function PageviewTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    trackPageview(pathname + search);
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageviewTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/for-designers" element={<ForDesigners />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  );
}
