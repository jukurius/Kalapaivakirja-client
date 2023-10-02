import { useContext } from "react";
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
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import SingleUser from "./pages/SingleUser";
import Statistics from "./pages/Statistics";
import Menu from "./components/nav/Menu";
import PersistLogin from "./components/reuseables/PersistLogin";
import PrivacyPolicy from "./pages/PrivacyPolicy"
import { AppContext } from "./AppContext";
import Modal from "./components/reuseables/customModal";
import GoogleMapShow from "./components/reuseables/GoogleMapSetLocation";
import { UploadContextProvider } from "./components/Catches/upload/context/UploadContext";
import OwnCatches from "./pages/OwnCatches";
import MyAccount from "./pages/myAccount";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

function App() {
  const { auth, openModal, closeModal, modalIsOpen } = useContext(AppContext);

  const Layout = () => {
    return (
      <div className="main">
        <Header
        />
        <div className="flex">
          {auth?.accessToken && (
              <Menu />
          )}
          <div className="h-[calc(100vh-5rem)] w-full overflow-y-auto bg-custom-light-gray">
            <div className="">
                <Outlet />
              {modalIsOpen && (
                <Modal isOpen={openModal} onClose={closeModal}>
                  <GoogleMapShow />
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <UploadContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="notfound" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
            <Route path="tietosuojaseloste" element={<PrivacyPolicy />} />
            {/* Private routes */}
            <Route element={<RequireAuth />}>
              <Route path="saaliit" element={<Catches />} />
              <Route path="saaliit/:id" element={<CatchDetails />} />
              <Route path="saaliini" element={<OwnCatches user={auth.user} />} />
              <Route path="lisaa-saalis" element={<UploadPost />} />
              <Route path="kayttajat" element={<Users />} />
              <Route path="kayttajat/:username" element={<SingleUser />} />
              <Route path="statistiikka" element={<Statistics />} />
              <Route path="profiili" element={<Profile />} />
              <Route path="oma-tili" element={<MyAccount />} />
              <Route path="kalenteri" element={<Calendar />} />
              <Route path="asetukset" element={<Settings />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </UploadContextProvider>
  );
}

export default App;
