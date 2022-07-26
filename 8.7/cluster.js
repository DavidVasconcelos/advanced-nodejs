const cluster = require("cluster");
const os = require("os");

const measurementTimeInSeconds = 10;

// **** Mock DB Call
const serverLifeTime = function () {
  this.count =
    this.count === undefined ? 0 : this.count + measurementTimeInSeconds;
  return this.count;
};
// ****

//**************************************************************** */
//V1

// if (cluster.isMaster) {
//   const cpus = os.cpus().length;

//   console.log(`Forking for ${cpus} CPUs`);
//   for (let i = 0; i < cpus; i++) {
//     cluster.fork();
//   }

//   console.dir(cluster.workers, { depth: 0 });
// } else {
//   require("./server");
// }

//**************************************************************** */
//V2

// if (cluster.isMaster) {
//   const cpus = os.cpus().length;

//   console.log(`Forking for ${cpus} CPUs`);
//   for (let i = 0; i < cpus; i++) {
//     cluster.fork();
//   }

//   console.dir(cluster.workers, { depth: 0 });
//   Object.values(cluster.workers).forEach((worker) => {
//     worker.send(`Hello Worker ${worker.id}`);
//   });
// } else {
//   require("./server");
// }

//**************************************************************** */
//V3

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  const updateWorkers = () => {
    const secondsCount = serverLifeTime();
    Object.values(cluster.workers).forEach((worker) => {
      worker.send({ secondsCount });
    });
  };

  updateWorkers();
  setInterval(updateWorkers, 10000);
} else {
  require("./server");
  process.addListener("log", (msg) => {
    console.log(
      `Second ${msg.secondsCount}, measure by worker with PID: ${msg.pid}`
    );
  });
}
