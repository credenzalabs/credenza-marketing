import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForDesigners from "./pages/ForDesigners";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Hidden preview routes */}
        <Route path="/preview" element={<Home />} />
        <Route path="/preview/for-designers" element={<ForDesigners />} />
        {/* Public routes — splash page */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}
