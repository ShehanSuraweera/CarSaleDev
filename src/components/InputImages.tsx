import { Input } from "@heroui/react";
import Image from "next/image";
import React, { ChangeEvent, useRef } from "react";
import { InputImagesIcon } from "./icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  updateField,
  updateImageUrls,
} from "@/src/redux/features/ad/adFormSlice";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const InputImages = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the input element

  const dispatch = useDispatch();
  const { adFormData } = useSelector((state: RootState) => state.adForm);

  // Handle file input change (image selection)
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Prevent exceeding 6 images
      if (files.length + adFormData.imageUrls.length > 6) {
        alert("You can upload up to 6 images.");
        return;
      }

      // Convert file list to array and create image previews
      const imageFiles = Array.from(files);
      const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));

      // Update Redux store with new images
      const updatedImages = [...adFormData.imageUrls, ...imagePreviews];
      dispatch(updateImageUrls(updatedImages));

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clears the file input
      }
    }
  };

  // Handle removal of an image (close button click)
  const removeImage = (index: number) => {
    const updatedImages = adFormData.imageUrls.filter((_, i) => i !== index); // Remove the image at the given index
    dispatch(updateImageUrls(updatedImages));
  };

  // Handle drag-and-drop reordering
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return; // Dropped outside the list

    const items = Array.from(adFormData.imageUrls);
    const [reorderedItem] = items.splice(result.source.index, 1); // Remove the dragged item
    items.splice(result.destination.index, 0, reorderedItem); // Insert the dragged item at the new position

    dispatch(updateImageUrls(items));
  };

  return (
    <div
      className={`sm:w-[90%] shadow-md w-full p-8 ${
        adFormData.imageUrls.length === 0
          ? "border-2 border-solid border-red-300"
          : ""
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

      <div className="w-full mt-8 ">
        {adFormData.imageUrls.length > 0 && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId="images"
              direction="horizontal"
              isDropDisabled={false}
              isCombineEnabled={false}
              ignoreContainerClipping={false}
            >
              {(provided: any, snapshot: any) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="relative grid grid-cols-1 gap-6 overflow-hidden sm:grid-cols-2 md:grid-cols-3"
                >
                  {adFormData.imageUrls.map((image, index) => (
                    <Draggable
                      key={index}
                      draggableId={`image-${index}`}
                      index={index}
                    >
                      {(provided: any, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative w-full h-48 overflow-hidden border rounded-md shadow-md "
                        >
                          <Image
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="object-cover w-full h-full"
                          />

                          {/* Close button */}
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute px-1 text-sm text-white bg-red-400 rounded-sm top-2 right-2"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default InputImages;
