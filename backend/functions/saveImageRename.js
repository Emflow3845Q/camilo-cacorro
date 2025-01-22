import fs from "fs";

export const saveImageRename = (file) => {
  const newPath = `./storage/${file.originalname}`;
  fs.renameSync(file.path, newPath);
};
