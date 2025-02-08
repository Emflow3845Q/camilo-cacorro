import sharp from "sharp";
import fs from "fs";
import path from "path";

export default function convertImage(format, req, res) {
  const imagePath = req.file.path;
  const imageName = path.basename(imagePath);
  const renameImage = path.join("storage", `converted_image.${format}`);

  console.log("Body:", format, renameImage);

  sharp(imagePath)
    .toFormat(format)
    .toFile(renameImage, (err, info) => {
      if (err) {
        console.error("Error al convertir la imagen:", err);
        return res.status(500).send("Error al convertir la imagen.");
      }

      // Elimina la imagen original
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error al eliminar la imagen original:", err);
      });

      // Descarga la imagen convertida
      res.download(renameImage, (err) => {
        if (err) {
          console.error("Error al descargar la imagen:", err);
          return res.status(500).send("Error al descargar la imagen.");
        }

        // Elimina la imagen convertida después de la descarga
        fs.unlink(renameImage, (err) => {
          if (err) console.error("Error al eliminar la imagen convertida:", err);
        });
      });
    });
}
