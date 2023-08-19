import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  //Errorhandling
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const [passError2, setPassError2] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateData = () => {
    var errorFlag = false;
    if (userName.length < 4 || userName.length > 50) {
      setUserError("Käyttäjänimen tulee olla 4-50 merkin mittainen");
      errorFlag = true;
    }
    if (password.length < 8 || password.length > 64) {
      setPassError("Salasanan tulee olla 8-64 merkin mittainen");
      errorFlag = true;
    } else {
      if (password !== password2) {
        setPassError2("Salasanat eivät täsmää. Kirjoita salasanat uudelleen");
        errorFlag = true;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Tarkasta sähköpostiosoitteesi");
      errorFlag = true;
    }
    if (errorFlag) {
      return false;
    }
    return true;
  };

  const registerAccount = async () => {
    try {
      var usrObject = {
        username: userName,
        password: password,
        email: email,
        firstname: firstName,
        lastname: lastName,
      };
      const res = await axios.post("http://localhost:3000/register", usrObject);
      console.log("Registration successful:", res);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error scenario
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateData()) {
      await registerAccount();
    }
  };

  const close = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center h-auto mt-10 container max-w-3xl mx-auto">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-screen bg-white p-8 shadow-md"
      >
        <div className="flex justify-end">
          <button onClick={(e) => close(e)}>
            <IconX />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Luo tili</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Sähköposti *
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
        </div>
        {emailError && <div className="text-red-500 mb-4">{emailError}</div>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userName"
          >
            Käyttäjänimi *
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userName"
            type="text"
            placeholder="Enter your name"
            value={userName}
            required
            minLength={4}
            onChange={(e) => {
              setUserName(e.target.value);
              setUserError("");
            }}
          />
        </div>
        {userError && <div className="text-red-500 mb-4">{userError}</div>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Salasana *
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPassError("");
              setPassError2("");
            }}
          />
        </div>
        {passError && <div className="text-red-500 mb-4">{passError}</div>}
        {passError2 && <div className="text-red-500 mb-4">{passError2}</div>}
        <div className="mb-8">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password2"
          >
            Salasana uudestaan *
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password2"
            type="password"
            placeholder="Enter your password"
            required
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
              setPassError("");
              setPassError2("");
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fistname"
          >
            Etunimi
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fistname"
            type="text"
            placeholder="Enter your name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastname"
          >
            Sukunimi
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            type="text"
            placeholder="Enter your name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Luo tili
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
