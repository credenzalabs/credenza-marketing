import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForDesigners from "./pages/ForDesigners";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const COMING_SOON = true; // hardcoded until image licensing is complete

export default function App() {
  if (COMING_SOON) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/for-designers" element={<ForDesigners />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
