const crypto = require("crypto");
const fs = require("fs");
const zlib = require("zlib");
const file = process.argv[2];

const { Transform } = require("stream");

const progress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write(".");
    callback(null, chunk);
  },
});

const algorithm = "aes-192-cbc";
const password = "a_secret";
const key = crypto.scryptSync(password, "salt", 24);
const iv = Buffer.alloc(16, 0);

fs.createReadStream(file)
  .pipe(crypto.createDecipheriv(algorithm, key, iv))
  .pipe(zlib.createGunzip())
  .pipe(progress)
  .pipe(fs.createWriteStream(file.slice(0, -3))) //without the extension part
  .on("finish", () => console.log("Done"));
