import express from "express";
import multer from "multer";
import path from "path";
import convertImage from "./functions/convertImage.js";

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 3001;  // Puerto dinámico para Render
const upload = multer({ dest: "./storage" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // 🔹 Agregado para Render

// Verifica que las vistas y funciones existen
console.log("Ruta de vistas:", path.join(__dirname, "views"));
console.log("Cargando convertImage:", convertImage);

app.get("/", (req, res) => {
  const selectedFormat = "png";
  res.render("formImage", { selectedFormat });
});

app.post("/convert", upload.single("image"), (req, res) => {
  const { format } = req.body;
  convertImage(format, req, res);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
