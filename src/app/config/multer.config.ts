import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      // My Special.Image#!@.png => 4545666fsgojfa-4535543344-my-image.png
      // My Special.Image#!@.png => [My Special, Image#!@, png]

      const originalName = file.originalname.toLowerCase();

      const baseName = originalName
        .replace(/\.[^/.]+$/, "")
        .replace(/\s+/g, "-") //empty space remove replace with dash
        .replace(/\./g, "-")
        // eslint-disable-next-line no-useless-escape
        .replace(/[^a-z0-9\-\.]/g, ""); // non alpha numeric - !@#$

      const extension = file.originalname.split(".").pop()?.toLowerCase();

      // binary -> 0,1 hexa decimal -> 0-9 A-F base 36 -> 0-9 a-z
      // 0.345676554434 -> "0.hjfahggughsafajghga" ->
      // 55457677788664
      const uniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        baseName +
        "." +
        extension;

      return uniqueFileName;
    },
  },
});

export const multerUpload = multer({ storage: storage });
