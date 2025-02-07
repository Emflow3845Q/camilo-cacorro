import sharp from "sharp";

export default function convertImage(format, req, res) {
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
}
