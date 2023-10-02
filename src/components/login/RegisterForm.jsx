import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IconX } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
import UploadDropdown from "../Catches/upload/inputs/UploadDropdown";
import registerJSON from "../../data/register.json";
import methodsJSON from "../../data/fishingMethods.json";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState([""]);
  const [activity, setActivity] = useState({ activity: "" });
  const [fishingMethod, setFishingMethod] = useState({ method: "" });
  const data = registerJSON;
  const methods = methodsJSON;
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [privacyCheckbox, setPrivacyCheckbox] = useState();

  const toggleDropdown = (index) => {
    if (index === openDropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

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
        description: description,
        image: image,
        activity: activity.activity,
        method: fishingMethod.method,
      };
      await axios.post("http://localhost:3000/register", usrObject);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error scenario
    }
  };

  const canSubmit = () => {
    if (
      userName &&
      email &&
      password &&
      password2 &&
      activity.activity &&
      fishingMethod.method &&
      privacyCheckbox
    ) {
      return true;
    }
    return false;
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

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file provided");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (event) => {
    fileToBase64(event.target.files[0])
      .then((base64Data) => {
        setImage(base64Data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleImageDelete = () => {
    setImage("");
  };

  const handleCheckboxChange = (e) => {
    setPrivacyCheckbox(e.target.checked);
  };

  return (
    <div className="flex justify-center gap h-auto my-4 md:my-20 container max-w-7xl mx-auto">
      <form onSubmit={(e) => handleSubmit(e)} className="w-screen p-8">
        <div className="flex justify-end mb-10">
          <button
            className="border-[1.6px] rounded-sm p-1 border-gray-800"
            onClick={(e) => close(e)}
          >
            <IconX />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-5 md:gap-10 lg:gap-20 md:grid-cols-2">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-4">
              Tervetuloa mukaan kalapäiväkirjan kasvavaan yhteisöön.
            </h2>
            <p className="mb-5 hidden md:block">
              Rekisteröidy nyt ja liity mukaan innostavaan yhteisöön, jossa voit
              tallentaa omat kalasaalisi, nähdä muiden jäsenten saaliit, sekä
              hyödyntää monipuolisia ominaisuuksia, jotka ovat käytettävissäsi
              rekisteröitymisen jälkeen.
            </p>
            <div className="hidden md:block">
              <label
                className="block text-gray-700 text-sm font-bold mb-4"
                htmlFor="email"
              >
                Profiili kuva
              </label>
              <div className="relative w-[100%] pb-[100%] sm:w-[80%] sm:pb-[80%] rounded-sm">
                <div
                  className="absolute flex justify-center items-center w-full h-full bg-cover bg-center bg-gray-300 border border-gray-400 rounded-md"
                  style={image ? { backgroundImage: `url(${image})` } : null}
                >
                  {!image && <IconPlus size={40} color="gray" />}
                  <input
                    type="file"
                    className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>
                {image && (
                  <button
                    className="absolute top-5 right-5"
                    onClick={handleImageDelete}
                  >
                    <IconX className="bg-white rounded" size={34} />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Sähköposti<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Syötä sähköpostiosoite"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
            </div>
            {emailError && (
              <div className="text-red-500 mb-4">{emailError}</div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="userName"
              >
                Käyttäjänimi<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                placeholder="Syötä käyttäjänimesi"
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
                Salasana<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Syötä salasana"
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
            {passError2 && (
              <div className="text-red-500 mb-4">{passError2}</div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password2"
              >
                Salasana uudestaan<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password2"
                type="password"
                placeholder="Syötä salasana uudestaan"
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
                htmlFor="activity"
              >
                Kalastus aktiivisuus<span className="text-red-500">*</span>
              </label>
              <UploadDropdown
                data={data}
                identifier="activity"
                value={activity}
                setValue={setActivity}
                isOpen={openDropdown === 0}
                onToggle={() => toggleDropdown(0)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="activity"
              >
                Kalastustyyli<span className="text-red-500">*</span>
              </label>
              <UploadDropdown
                data={methods}
                identifier="method"
                value={fishingMethod}
                setValue={setFishingMethod}
                isOpen={openDropdown === 1}
                onToggle={() => toggleDropdown(1)}
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
                className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fistname"
                type="text"
                placeholder="Syötä etunimi"
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
                className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastname"
                type="text"
                placeholder="Syötä sukunimi"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Profiili kuvaus
              </label>
              <textarea
                className="appearance-none border  border-b-2 border-b-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Kirjoita halutessasi itsestäsi."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
              />
            </div>
            <div className="md:hidden mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-4"
                htmlFor="email"
              >
                Profiili kuva
              </label>
              <div className="relative w-[100%] pb-[100%] sm:w-[72%] sm:pb-[72%] rounded-sm">
                <div
                  className="absolute flex justify-center items-center w-full h-full bg-cover bg-center bg-gray-300 border border-gray-400 rounded-md"
                  style={image ? { backgroundImage: `url(${image})` } : null}
                >
                  {!image && <IconPlus size={40} color="gray" />}
                  <input
                    type="file"
                    className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>
                {image && (
                  <button
                    className="absolute top-5 right-5"
                    onClick={handleImageDelete}
                  >
                    <IconX className="bg-white rounded" size={34} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacyCheckbox"
                className="form-checkbox h-5 w-5 text-indigo-600 accent-[#3C50E0]"
                onChange={(e) => handleCheckboxChange(e)}
              />
              <label
                htmlFor="privacyCheckbox"
                className="ml-2 text-sm text-gray-600"
              >
                Olen lukenut ja hyväksyn{" "}
                <Link
                  className="text-blue-800 underline"
                  to="/tietosuojaseloste"
                >
                  Tietosuojaselosteen<span className="text-red-500">*</span>
                </Link>
              </label>
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  !canSubmit
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }}`}
                type="submit"
                disabled={!canSubmit()}
              >
                Luo tili
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
