import express from "express";
import {
  mediaUpload,
  transformImage,
  getImageInfo,
  optimizeImage,
  removeBackground,
} from "../controllers/media.controller.js";
import { upload } from "../utils/multer.js";
const router = express.Router();

// router.post("/", upload.single("file"), mediaUpload);
router.post("/upload", upload.single("image"), mediaUpload);
router.post("/transform", transformImage);
router.post("/optimize", optimizeImage);
router.post("/remove-background", removeBackground);
router.get("/info/:public_id", getImageInfo);

export default router;
