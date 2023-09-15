import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconX } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
import useUploadContext from "../../../../hooks/useUploadContext";
import PropTypes from "prop-types";
import UploadDropdown from "../inputs/UploadDropdown";

const Page3 = () => {
  const initialImages = ["", "", ""];
  const { data, setData } = useUploadContext();
  const [images, setImages] = useState(initialImages);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (index === openDropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  useEffect(() => {
    var filteredArr = images.filter((item) => item !== "");
    setData({
      ...data,
      images: filteredArr,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

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

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    fileToBase64(event.target.files[0])
      .then((base64Data) => {
        newImages[index] = base64Data;
        setImages(newImages);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages[index] = "";
    setImages(newImages);
  };

  const handleCheckboxChange = (e) => {
    console.log("first", e.target.checked);
    setData({ ...data, privacyPolicy: e.target.checked });
  };

  return (
    <div className="flex flex-col">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Lisää vähintään yksi kuva<span className="text-red-500">*</span>
      </label>
      <div className="grid grid-flow-col gap-2">
        {images.map((image, index) => (
          <ImageBox
            key={index}
            image={image}
            onImageChange={(e) => handleImageChange(index, e)}
            onDelete={() => handleDeleteImage(index)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6 mt-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Asetan saaliini tilaan<span className="text-red-500">*</span>
            <UploadDropdown
              data={[
                { id: 1, value: "Julkinen" },
                { id: 0, value: "Yksityinen" },
              ]}
              identifier="is_private"
              value={data}
              setValue={setData}
              isOpen={openDropdown === 0}
              onToggle={() => toggleDropdown(0)}
            />
          </label>
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
              target="_blank"
            >
              Tietosuojaselosteen
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
};

const ImageBox = ({ image, onImageChange, onDelete }) => {
  const backgroundImageStyle = image
    ? { backgroundImage: `url(${image})` }
    : null;

  return (
    <div className="w-full h-24 sm:h-40 md:h-48 lg:h-32 xl:h-48 relative rounded-sm m-2">
      <div
        className="flex justify-center items-center w-full h-full bg-cover bg-center bg-gray-300 border border-gray-400 rounded-md"
        style={backgroundImageStyle}
      >
        {!image && <IconPlus size={40} color="gray" />}
        <input
          type="file"
          className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
          onChange={onImageChange}
        />
      </div>
      {image && (
        <button className="absolute top-2 right-2" onClick={onDelete}>
          <IconX className="bg-white rounded" size={24} />
        </button>
      )}
    </div>
  );
};

Page3.propTypes = {
  image: PropTypes.string,
  onImageChange: PropTypes.func,
  onDelete: PropTypes.func,
};

ImageBox.propTypes = {
  image: PropTypes.string,
  onImageChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Page3;
