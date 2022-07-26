const http = require("http");
const pid = process.pid;

let secondsCount;

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++); // simulate CPU work
    res.write(`Handled by process ${pid}\n`);
    res.end(`This server was activated ${secondsCount} seconds ago`);
    process.emit("log", { pid, secondsCount });
  })
  .listen(8080, () => {
    console.log(`Started process ${pid}`);
  });

//**************************************************************** */
//V1

// process.on("message", (msg) => {
//   console.log(`Message from master: ${msg}`);
// });

//**************************************************************** */
//V2

process.on("message", (msg) => {
  secondsCount = msg.secondsCount;
});
