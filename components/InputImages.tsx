import { Input } from "@heroui/react";
import Image from "next/image";
import React, { useState, ChangeEvent, useRef } from "react";

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
    <div className="sm:w-[90%] shadow-md w-full p-8">
      <Input
        labelPlacement="outside"
        label="Images (max 6)"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        ref={fileInputRef}
      />

      <div className="mt-4">
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-48 overflow-hidden border rounded-md"
              >
                <Image
                  src={image}
                  alt={`Preview ${index + 1}`}
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
