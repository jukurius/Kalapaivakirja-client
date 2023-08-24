import { useState } from "react";
import { IconLogin } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import ValidationComponent from "../reuseables/InputWithValidation";
import { notify } from "../reuseables/NotificationService";
const LOGIN_URL = "/login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [isValid, setIsValid] = useState(true);
  const [submitError, setSubmitError] = useState(false);

  const login = async () => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token;
      const user = response?.data?.user;
      const img = response?.data?.img
      setAuth({ user: user, accessToken: accessToken, img: img });
      localStorage.setItem("isLogged", JSON.stringify(true));
      setEmail("");
      setPassword("");
      navigate("/");
      notify(`Tervetuloa ${user}`, "success");
    } catch (err) {
      if (!err?.response) {
        console.log(err);
      } else {
        if (err.response.status === 401) {
          setSubmitError(true);
        }
      }
    }
  };

  const close = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="flex justify-center items-center h-auto mt-10 container max-w-3xl mx-auto">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" w-screen bg-white p-8 shadow-md"
      >
        <div className="flex justify-end">
          <button onClick={(e) => close(e)}>
            <IconX />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <IconLogin className="mr-2" /> Kirjaudu sisään
        </h2>
        <ValidationComponent
          fieldName={"Sähköposti"}
          data={email}
          setData={setEmail}
          actionType={"login"}
          type={"email"}
          isValid={isValid}
          setIsValid={setIsValid}
        />
        <div>
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
        {submitError && (
          <p className="text-sm text-red-400 mb-4">
            Kirjautuminen epäonnistui, tarkasta sähköpostiosoite ja salasana.
          </p>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
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
