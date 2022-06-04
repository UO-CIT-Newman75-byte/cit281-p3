const {coinCount} = require("./p3-module.js");

const fs = require('fs');
// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax

// part 8
fastify.get("/", (request, reply) => {
  reply
fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
    reply
    .code(500)
    .header('Content-Type', 'text/html')
    .send("Error processing request");
    } else {
    reply
    .code(200)
    .header('Content-Type', 'text/html')
    .send(data);
    }
});
});

// part 9
fastify.get("/coin", (req, res) => {
    let {denom = 0, count = 0} = req.query
    denom = parseInt(denom);
    count = parseInt(count);
    console.log(denom)
    console.log(count)
    let coinValue = coinCount({denom, count})
    res
    .code(200)
    .header("Content-Type", "text/html")
    .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
});


// part 10
fastify.get("/coins", (req, res) => {
    let {option} = req.query
    option = parseInt(option);
    let coinValue = [];
    const coins = [{denom: 25, count: 2}, {denom: 1, count: 7}];
    switch (option) {
        case 1:
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
        case 2:
            coinValue = coinCount(...coins);
            break;
        default:
            coinValue = 0;
            break;
    }

    res
    .code(200)
    .header("Content-Type", "text/html")
    .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
}
);

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});