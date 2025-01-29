import apiClient from "@/src/services/api-client";
import { createSupabaseClient } from "@/src/supabase/client";
import imageCompression from "browser-image-compression";

export const convertAndUploadBlobs = async (
  blobUrls: string[],
  adId: string,
  bucketName: string
): Promise<void> => {
  function getStorage() {
    const { storage } = createSupabaseClient();
    return storage;
  }
  for (const blobUrl of blobUrls) {
    try {
      // Fetch the blob
      const response = await fetch(blobUrl);
      const blob = await response.blob();

      // Extract the original file name from the Blob URL (optional)
      const originalName = "image"; // You can derive a default name or replace it

      // Generate the new file name
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:.-]/g, "");
      const newFileName = `${adId}_${timestamp}_${originalName}.png`;

      // Create a file from the blob
      let file = new File([blob], newFileName, { type: blob.type });

      try {
        file = await imageCompression(file, {
          maxSizeMB: 1,
        });
      } catch (error) {
        console.error(error);
      }

      const storage = getStorage();
      // Upload the file to Supabase
      const { data, error } = await storage
        .from(bucketName)
        .upload(newFileName, file);

      if (error) {
        console.error(`Error uploading ${newFileName}:`, error.message);
        throw error;
      }

      const imageUrl = `${process.env
        .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucketName}/${
        data?.path
      }`;

      console.log(imageUrl);

      try {
        await apiClient.post("/uploads/upload-imageUrls", {
          ad_id: adId,
          image_url: imageUrl,
        });
        console.log("uploaded urls to db");
      } catch (error) {
        console.log("Error uploading urls to db");
      }

      console.log(`Successfully uploaded ${newFileName}`);
    } catch (error) {
      console.error("Error processing blob URL:", blobUrl, error);
    }
  }
};
