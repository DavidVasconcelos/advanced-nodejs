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
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipheriv(algorithm, key, iv))
  .pipe(progress)
  .pipe(fs.createWriteStream(file + ".zz"))
  .on("finish", () => console.log("Done"));
