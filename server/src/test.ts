import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("error", console.error)

wss.on("connection", (soc, req) => {
		console.log(req.headers)

		console.log("a user connected");
		soc.on("message", (msg) => {
				console.log(msg.toString());
		});
		soc.on("close", () => {
				console.log("user disconnected");
		});
		soc.send("Hello World!");
})

wss.on("listening", () => {
		console.log("listening on *:8080");
});
