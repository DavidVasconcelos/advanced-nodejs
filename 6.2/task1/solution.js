const fs = require("fs");
const path = require("path");
const dirname = path.join(__dirname, "files");

const files = fs.readdirSync(dirname);

files.forEach((file) => {
  //platform agnostic
  const filePath = path.join(dirname, file);
  // stats of file including size
  fs.stat(filePath, (err, stats) => {
    if (err) throw err;
    fs.truncate(filePath, stats.size / 2, (err) => {
      if (err) throw err;
    });
  });
});
