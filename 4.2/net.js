const server = require("net").createServer();
let counter = 0;
let sockets = {};

server.on("connection", (socket) => {
  socket.id = counter++;
  sockets[socket.id] = socket;

  console.log(`Client ${socket.id} connected`);
  socket.write("Welcome new client!\n");

  socket.on("data", (data) => {
    Object.entries(sockets).forEach(([, cs]) => {
      cs.write(`${socket.id}: `);
      cs.write(data.toString());
    });
    console.log(data.toString());
  });

  socket.on("end", () => {
    console.log(`Client ${socket.id} disconnected`);
    delete sockets[socket.id];
  });
});

server.listen(8000, () => console.log("Server bound"));
