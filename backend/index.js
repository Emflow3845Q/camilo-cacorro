import express from "express";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { saveImageRename } from "./functions/saveImageRename.js";

const app = express();
const port = 3001;

const upload = multer({ dest: "./storage" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/convert", upload.single("image"), (req, res) => {
  const { format } = { ...req.body };
  const imagePath = req.file.path;
  const imageName = path.basename(imagePath);
  const renameImage = `storage/converted_image.${format}`;
  console.log("Body: ", format, renameImage);

  sharp(imagePath)
    .toFormat(format)
    .toFile(renameImage, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al convertir la imagen.");
      }
      fs.unlinkSync(imagePath);
      res.download(renameImage, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error al descargar la imagen.");
        }
        fs.unlinkSync(renameImage);
      });
    });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
