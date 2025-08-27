"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_config_1 = require("./cloudinary.config");
const multer_1 = __importDefault(require("multer"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_config_1.cloudinaryUpload,
    params: {
        public_id: (req, file) => {
            // My Special.Image#!@.png => 4545666fsgojfa-4535543344-my-image.png
            // My Special.Image#!@.png => [My Special, Image#!@, png]
            var _a;
            const originalName = file.originalname.toLowerCase();
            const baseName = originalName
                .replace(/\.[^/.]+$/, "")
                .replace(/\s+/g, "-") //empty space remove replace with dash
                .replace(/\./g, "-")
                // eslint-disable-next-line no-useless-escape
                .replace(/[^a-z0-9\-\.]/g, ""); // non alpha numeric - !@#$
            const extension = (_a = file.originalname.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            // binary -> 0,1 hexa decimal -> 0-9 A-F base 36 -> 0-9 a-z
            // 0.345676554434 -> "0.hjfahggughsafajghga" ->
            // 55457677788664
            const uniqueFileName = Math.random().toString(36).substring(2) +
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
exports.multerUpload = (0, multer_1.default)({ storage: storage });
