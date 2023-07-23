import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";

export const basePath = path.join(__dirname, '../uploadedFiles/')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, basePath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
}
)
const uploadConfig =
  multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } })
    .single('images')
export { uploadConfig }