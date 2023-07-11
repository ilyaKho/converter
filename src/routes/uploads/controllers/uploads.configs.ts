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
multer({ storage })
  .single('images')
export { uploadConfig }