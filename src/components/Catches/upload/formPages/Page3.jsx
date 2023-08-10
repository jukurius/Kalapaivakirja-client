import React, { useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
import useUploadContext from "../../../../hooks/useUploadContext";

const ImageBox = ({ image, onImageChange, onDelete }) => {
  const backgroundImageStyle = image
    ? { backgroundImage: `url(${image})` }
    : null;

  return (
    <div className="relative w-64 h-64 rounded-md p-4 m-2">
      <div
        className="flex justify-center items-center w-full h-full bg-cover bg-center bg-gray-300 border border-gray-400 rounded-md"
        style={backgroundImageStyle}
      >
        <IconPlus size={40} color="gray" />
        <input
          type="file"
          className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
          onChange={onImageChange}
        />
      </div>
      {image && (
        <button
          className="absolute top-2 right-2 bg-white rounded"
          onClick={onDelete}
        >
          <IconX size={40} />
        </button>
      )}
    </div>
  );
};

const Page3 = () => {
  const initialImages = ["", "", ""];
  const { data, setData } = useUploadContext();
  const [images, setImages] = useState(initialImages);

  useEffect(() => {
    var filteredArr = images.filter(item => item !== "");
    setData({
      ...data,
      images: filteredArr
    });
  }, [images])

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(event.target.files[0]);
    setImages(newImages);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages[index] = "";
    setImages(newImages);
  };
  console.log(data)

  return (
    <div className="">
      <label className="block text-gray-700 text-sm font-bold mb-2">Lisää vähintään yksi kuva *</label>
      <div className="grid grid-flow-col">
        {images.map((image, index) => (
          <ImageBox
            key={index}
            image={image}
            onImageChange={(e) => handleImageChange(index, e)}
            onDelete={() => handleDeleteImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Page3;
