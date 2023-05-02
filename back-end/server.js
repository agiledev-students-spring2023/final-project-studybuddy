#!/usr/bin/env node
const server = require("./app"); // load up the web server
const port = 4000; // the port to listen to for incoming requests
// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
	console.log(`Server running on port: ${port}`);
});
// a function to stop listening to the port
const close = () => {
	listener.close();
};

ws = require("websocket").server;
const ws_server = new ws({
	httpServer: listener,
});
ws_controller = require("./socket.js").ws_controller;

ws_server.on("request", ws_controller);

module.exports = {
	close: close,
};
