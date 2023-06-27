const fs = require("fs");
const path = require("path");

export function listDir(...pathDir: string[]) {
  const files = fs.readdirSync(fullPath(...pathDir));
  return files;
}

export function readJSON(...pathFile: string[]) {
  const JSONString = fs.readFileSync(fullPath(...pathFile)).toString();
  return JSON.parse(JSONString);
}

export function writeJSON(newObject: any, ...pathFile: string[]) {
  const fullPathString = fullPath(...pathFile);
  console.log(fullPathString);

  if (isJSON(fullPathString) === false) {
    console.log("aqui");
    return;
  }
  fs.writeFileSync(fullPathString, JSON.stringify(newObject), null, 2);
  console.log("aqui2");

  return;
}

export function deleteJSON(...pathFile: string[]) {
  const fullPathString = fullPath(...pathFile);
  if (isJSON(fullPathString) === true) {
    fs.unlink(fullPathString, (err: string) => {
      if (err) {
        return err;
      } else {
        return "Arquivo JSON apagado!";
      }
    });
  } else {
    return "O arquivo não é JSON, por isso não foi apagado!";
  }
}

export function patchJSON(updateObject: any, ...pathFile: string[]) {
  const fullPathString = fullPath(...pathFile);
  if (isJSON(fullPathString) === true) {
    const JSONFileString = fs.readFileSync(fullPathString).toString();
    const JSONObject = JSON.parse(JSONFileString);
    const newObject = { ...JSONObject, ...updateObject };
    fs.writeFileSync(fullPathString, JSON.stringify(newObject, null, 2));
  }
  return;
}

export function fullPath(...pathDir: string[]) {
  return path.join(__dirname, ...pathDir);
}

export function isJSON(pathJSON: string) {
  return pathJSON.endsWith(".json");
}
