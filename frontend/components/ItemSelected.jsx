// eslint-disable-next-line react/prop-types
const ItemSelected = ({ selectedFormat, onFormatChange }) => {
  const handleFormatChange = (event) => {
    const newFormat = event.target.value;
    onFormatChange(newFormat);
  };

  return (
    <select
      name="format"
      id="format"
      value={selectedFormat}
      onChange={handleFormatChange}
    >
      <option value="png">PNG</option>
      <option value="jpg">JPG</option>
      <option value="webp">WEBP</option>
      <option value="gif">GIF</option>
    </select>
  );
};

export default ItemSelected;
