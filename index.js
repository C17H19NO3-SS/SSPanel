import express from "express";
import http from "http";
import Static from "./Routers/Static/Static";
import Log from "./Routers/Log/Log";
import fs from "fs";
import { Server } from "socket.io";
import { DEFAULT_HOST, DEFAULT_LOOPS_DIR, DEFAULT_PORT } from "./consts";
import Login from "./Routers/Login/Login.js";
import cookieParser from "cookie-parser";
import AuthController from "./Routers/AuthController/AuthController.js";
import Api from "./Routers/Api/Api.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(Log);
app.use(AuthController);
app.use(Login);
app.use(Static);
app.use(Api);

server.listen(DEFAULT_PORT, DEFAULT_HOST, (...args) =>
	console.log(`Server started on Port ${args[2]}.`),
);

fs.readdirSync(DEFAULT_LOOPS_DIR).forEach((val) => {
	const { Loop, LoopInterval } = require(`${DEFAULT_LOOPS_DIR}/${val}`);
	setInterval(Loop, LoopInterval);
});
