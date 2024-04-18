import express from "express";
import http from "http";
import Static from "./Routers/Static/Static";
import Log from "./Routers/Log/Log";
import fs from "fs";
import { Server } from "socket.io";
import {
	DEFAULT_ERROR_LOG_FILE,
	DEFAULT_HOST,
	DEFAULT_LANGUAGE,
	DEFAULT_LOG_FILE,
	DEFAULT_LOOPS_DIR,
	DEFAULT_PORT,
	DEFAULT_PROCESS_LOG_DIR,
	DEFAULT_RENDER_ENGINE,
	DEFAULT_THEME_FOLDER,
	DEFAULT_THEME_NAME,
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
import Themes from "./Routers/Theme/Themes.js";
import variables from "./variables.js";
import { I18n } from "i18n-js";
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }

});
const ext = new ExtensionManager();

app.set("views", `${DEFAULT_THEME_FOLDER}/${DEFAULT_THEME_NAME}`);
app.set("view engine", DEFAULT_RENDER_ENGINE);

app.use(cors({
   "origin": "*",
   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
   "preflightContinue": false,
   "optionsSuccessStatus": 204
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
	req.i18n = new I18n(require("./translation.json"), {
		defaultLocale: DEFAULT_LANGUAGE,
	});
	req.setLanguage = (lang) => {
		req.i18n.locale = lang;
	};
	req.setLanguage(DEFAULT_LANGUAGE);
	req.isAuthenticated = req.cookies?.token === TOKEN;
	req.Processes = ProcessManager.GetProcesses();
	req.ProcessManager = ProcessManager;
	req.Exts = ext.extensions;
	req.ThemeVariables = variables;
	next();
});
app.use(ext.Middleware);
app.use(Log);
app.use(AuthController);
app.use(Api);
app.use(Login);
app.use(Themes);
app.use(Static);

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
	fs.readdirSync(DEFAULT_THEME_FOLDER).forEach((val) => {
		app.use(
			`/${val}/static`,
			express.static(`${DEFAULT_THEME_FOLDER}/${val}/Static`),
		);
	});
	console.log(TOKEN);
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
