const http = require("http");
const pid = process.pid;

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++); // simulate CPU work
    res.end(`Handled by process ${pid}`);
  })
  .listen(8080, () => {
    console.log(`Started process ${pid}`);
  });

//ab -c200 -t10 http://localhost:8080/ 200 conections for 10 seconds
