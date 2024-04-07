import express from "express";
import http from "http";
import Static from "./Routers/Static/Static";
import Log from "./Routers/Log/Log";
import fs from "fs";
import { Server } from "socket.io";
import {
	DEFAULT_ERROR_LOG_FILE,
	DEFAULT_HOST,
	DEFAULT_LOG_FILE,
	DEFAULT_LOOPS_DIR,
	DEFAULT_PORT,
	DEFAULT_PROCESS_LOG_DIR,
	TOKEN,
} from "./consts";
import Login from "./Routers/Login/Login.js";
import cookieParser from "cookie-parser";
import AuthController from "./Routers/AuthController/AuthController.js";
import Api from "./Routers/Api/Api.js";
import Commands from "./Commands/Commands.js";
import ProcessManager, { Processes } from "./Classes/ProcessManager.js";
import ScriptParser from "./Classes/ScriptParser.js";
import chalk from "chalk";
import ExtensionManager from "./Classes/ExtensionManager.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const ext = new ExtensionManager();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
	req.isAuthenticated = req.cookies?.token === TOKEN;
	req.Processes = Processes;
	req.ProcessManager = ProcessManager;
	req.Exts = ext.extensions;
	next();
});
app.use(ext.Middleware);
app.use(Log);
app.use(AuthController);
app.use(Login);
app.use(Static);
app.use(Api);

server.listen(DEFAULT_PORT, DEFAULT_HOST, (...args) => {
	console.clear();
	console.log(`Server started on Port ${args[2]}.`);
	for (const [, value] of Object.entries(Commands)) {
		if (value?.autoStart === true) {
			console.log(
				chalk.green(
					`Success: Process Started PID ${
						ProcessManager.Spawn(
							ScriptParser.Parse({ command: value?.command, env: value?.env }),
						).pid
					}`,
				),
			);
		}
	}
	fs.readdirSync(DEFAULT_PROCESS_LOG_DIR)
		.filter((val) => {
			return val.endsWith(".txt") && val.startsWith("Process");
		})
		.forEach((val) => {
			fs.rmSync(`${DEFAULT_PROCESS_LOG_DIR}/${val}`);
		});
	fs.writeFileSync(DEFAULT_LOG_FILE, "");
});

fs.readdirSync(DEFAULT_LOOPS_DIR).forEach((val) => {
	const { Loop, LoopInterval } = require(`${DEFAULT_LOOPS_DIR}/${val}`);
	setInterval(Loop, LoopInterval);
});

process.on("uncaughtException", (err) => {
	try {
		fs.appendFileSync(DEFAULT_ERROR_LOG_FILE, err.toString());
	} catch (error) {
		fs.writeFileSync(DEFAULT_ERROR_LOG_FILE, error.toString());
	}
});
