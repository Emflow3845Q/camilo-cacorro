import { useState } from "react";
import ItemSelected from "./ItemSelected";

const FormImage = () => {
  const [selectedFormat, setSelectedFormat] = useState("png");

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  return (
    <div>
      <form
        action="http://localhost:3001/convert"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="image" id="imageInput" />
        <h4>Selecciona un formato: </h4>
        <ItemSelected
          selectedFormat={selectedFormat}
          onFormatChange={handleFormatChange}
        />
        <br />
        <button type="submit">Convertir imagen</button>
      </form>
    </div>
  );
};

export default FormImage;
