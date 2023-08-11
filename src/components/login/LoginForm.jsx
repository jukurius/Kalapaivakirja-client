import React, { useState } from "react";
import { IconLogin } from "@tabler/icons-react";
import {  Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const LOGIN_URL = "/login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const login = async () => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: password}),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.token;
      const user = response?.data?.user;
      setAuth({ user: user, accessToken: accessToken });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  console.log(auth)
  return (
    <div className="flex justify-center items-center h-auto mt-10 container max-w-3xl mx-auto">
      <form className=" w-screen bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <IconLogin className="mr-2" /> Kirjaudu sisään
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Sähköposti
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Syötä sähköpostiosoite"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Salasana
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Syötä salasanasi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Kirjaudu
          </button>
          <Link
            to="/register"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Puuttuuko tili?
          </Link>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/"
          >
            Unohtuiko salasana?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
