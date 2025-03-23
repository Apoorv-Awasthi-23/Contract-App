import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadContract from "./pages/UploadContract";
// import EditContract from "./pages/EditContract";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadContract />} />
      {/* <Route path="/edit/:id" element={<EditContract />} /> */}
    </Routes>
  );
}

export default App;
