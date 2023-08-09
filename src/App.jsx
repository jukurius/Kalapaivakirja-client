import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import Catches from "./pages/Catches";
import CatchDetails from "./pages/CatchDetails";
import NotFound from "./pages/NotFound";
import { AppContextProvider } from "./AppContext";
import RequireAuth from "./components/reuseables/requireAuth";
import UploadPost from "./pages/UploadPost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="saaliit" element={<Catches />} />
      <Route path="notfound" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<RequireAuth />}>
        <Route path="saaliit/:id" element={<CatchDetails />} />
        <Route path="lisaa-saalis" element={<UploadPost />}/>
      </Route>
    </Route>
  )
);

function App({ routes }) {
  return (
    <>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </>
  );
}

export default App;
