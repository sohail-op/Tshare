import express from "express";

import {
  uploadText,
  getText
} from "../controllers/textController.js";

const router = express.Router();

router.route("/uploadText").post(uploadText);
router.route("/getText/:code").get(getText);

export default router;
