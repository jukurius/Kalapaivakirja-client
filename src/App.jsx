import { useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import Catches from "./pages/Catches";
import CatchDetails from "./pages/CatchDetails";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/reuseables/requireAuth";
import UploadPost from "./pages/UploadPost";
import Menu from "./components/nav/Menu";
import PersistLogin from "./components/reuseables/PersistLogin";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const Layout = () => {
    return (
      <div className="main">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="middle-container flex">
          <div
            className={`absolute z-50 h-[calc(100vh-5rem)] overflow-y-auto lg:static menu-container w-80 text-white bg-slate-800 px-5 py-5 ${
              isOpen && "hidden"
            }`}
          >
            <Menu />
          </div>
          <div className="content-container h-[calc(100vh-5rem)] overflow-y-auto w-full bg-custom-light-gray">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="saaliit" element={<Catches />} />
          <Route path="notfound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          {/* Private routes */}
          <Route element={<RequireAuth />}>
            <Route path="saaliit/:id" element={<CatchDetails />} />
            <Route path="lisaa-saalis" element={<UploadPost />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
