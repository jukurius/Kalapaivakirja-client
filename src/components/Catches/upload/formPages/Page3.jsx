import React, { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";

const Page3 = () => {
  const [selectedImg2, setSelectedImg2] = useState(null);
  const [selectedImg3, setSelectedImg3] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event, identifier) => {
    const image = event.target.files[0];
    switch (identifier) {
      case 1:
        setSelectedImage(URL.createObjectURL(image));
        return;
      case 2:
        setSelectedImg2(URL.createObjectURL(image));
        return;
      case 3:
        setSelectedImg3(URL.createObjectURL(image));
    }
  };

  const handleImageDelete = (identifier) => {
    switch (identifier) {
      case 1:
        setSelectedImage(null);
        return;
      case 2:
        setSelectedImg2(null);
        return;
      case 3:
        setSelectedImg3(null);
        return;
    }
  };

  return (
    <>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Lisää vähintään yksi kuva *</label>
        </div>
      <div className="mb-4 grid grid-flow-col gap-2">
        {/* First imagebox */}
        <div className="w-64 h-64 bg-gray-200 relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, 1)}
            id="imageInput"
          />
          {selectedImage ? (
            <>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedImage})` }}
              />
              <div
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                onClick={() => handleImageDelete(1)}
              >
                <IconX />
              </div>
            </>
          ) : (
            <label
              htmlFor="imageInput"
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              <IconPlus size={80} color="grey" />
            </label>
          )}
        </div>
        {/* Second imagebox */}
        <div className="w-64 h-64 bg-gray-200 relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, 2)}
            id="imageInput2"
          />
          {selectedImg2 ? (
            <>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedImg2})` }}
              />
              <div
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                onClick={() => handleImageDelete(2)}
              >
                <IconX />
              </div>
            </>
          ) : (
            <label
              htmlFor="imageInput2"
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              <IconPlus size={80} color="grey" />
            </label>
          )}
        </div>
        {/* Third imagebox */}
        <div className="w-64 h-64 bg-gray-200 relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, 3)}
            id="imageInput3"
          />
          {selectedImg3 ? (
            <>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedImg3})` }}
              />
              <div
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                onClick={() => handleImageDelete(3)}
              >
                <IconX />
              </div>
            </>
          ) : (
            <label
              htmlFor="imageInput3"
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              <IconPlus size={80} color="grey" />
            </label>
          )}
        </div>
      </div>
    </>
  );
};

export default Page3;
