const { exec } = require("child_process");

exec("find . -type f | wc -l", (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  const lines = stdout.toString().trim();
  console.log(`Number of files in this path is ${lines}`);
});
