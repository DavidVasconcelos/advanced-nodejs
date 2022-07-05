const fs = require("fs");
const path = require("path");

const dirname = path.join(__dirname, "files");
const currentFiles = fs.readdirSync(dirname);

const logWithTime = (message) =>
  console.log(`${new Date().toUTCString()}: ${message}`);

fs.watch(dirname, (eventType, filename) => {
  if (eventType !== "rename") {
    logWithTime(`${filename} was changed`);
    return;
  }
  // add or delete
  const index = currentFiles.indexOf(filename);
  // file exists in the directory
  if (index >= 0) {
    // update currentFiles array
    currentFiles.splice(index, 1);
    logWithTime(`${filename} was removed`);
    return;
  }

  currentFiles.push(filename);
  logWithTime(`${filename} was added`);
  return;
});
