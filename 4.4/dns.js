const dns = require("dns"); // name -- addresses

// dns.lookup("pluralsight.com", (err, address) => {
//   console.log(address);
// });

// dns.resolve4("pluralsight.com", (err, address) => {
//   console.log(address);
// });

// dns.resolveMx("pluralsight.com", (err, address) => {
//   console.log(address);
// });

dns.reverse("52.88.119.169", (err, hostnames) => {
  console.log(hostnames);
});
