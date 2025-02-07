import express from "express";
import multer from "multer";
import path from "path";
import convertImage from "./functions/convertImage.js";

const app = express();
const __dirname = path.resolve();

const port = 3001;
const upload = multer({ dest: "./storage" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

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
