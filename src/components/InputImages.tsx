import { Input } from "@heroui/react";
import Image from "next/image";
import React, { useState, ChangeEvent, useRef } from "react";
import { InputImagesIcon } from "./icons";

// Define types for the images state
type ImageQueue = string[]; // Array of image URLs

interface InputImagesProps {
  onImagesChange: (images: ImageQueue) => void; // Callback to send images to the parent
}

const InputImages: React.FC<InputImagesProps> = ({ onImagesChange }) => {
  const [images, setImages] = useState<ImageQueue>([]); // State to hold image URLs
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the input element

  // Handle file input change (image selection)
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Prevent exceeding 5 images
      if (files.length + images.length > 6) {
        alert("You can upload up to 6 images.");
        return;
      }

      // Convert file list to array and create image previews
      const imageFiles = Array.from(files);
      const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));

      // Update state with new images
      const updatedImages = [...images, ...imagePreviews];
      setImages(updatedImages);

      // Notify the parent component
      onImagesChange(updatedImages);

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clears the file input
      }
    }
  };

  // Handle removal of an image (close button click)
  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index); // Remove the image at the given index
    setImages(updatedImages);

    // Notify the parent component
    onImagesChange(updatedImages);
  };

  return (
    <div
      className={`sm:w-[90%] shadow-md w-full p-8 ${
        images.length === 0 ? "border-2 border-solid border-red-300" : ""
      }`}
    >
      <label className="flex text-sm font-medium text-gray-700 hover:cursor-pointer">
        <span>Choose Images (max 6)</span>
        {"  "}
        <span className="text-red-500">*</span>
        <div className="block w-5 ml-3">
          <InputImagesIcon />
        </div>
        <Input
          labelPlacement="outside"
          label="Images (max 6)"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          ref={fileInputRef}
          placeholder="Select images"
          className="hidden"
        ></Input>
      </label>

      <div className="mt-8">
        {images.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-48 overflow-hidden border rounded-md"
              >
                <Image
                  src={image}
                  alt={`Preview ${index + 1}`}
                  width={500}
                  height={500}
                  className="object-contain w-full h-full "
                />
                {/* Close button */}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute px-1 text-sm text-white bg-red-400 rounded-sm top-2 right-2"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputImages;
