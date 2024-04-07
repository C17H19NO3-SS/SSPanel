import { Router } from "express";
import fs from "fs";
import {
	DEFAULT_EXTENSIONS_DIR,
	DEFAULT_EXTENSIONS_ROUTING_PATH,
} from "../consts";
import Utils from "../Utils/Utils";
import ErrorResponser from "./Error";
export default class ExtensionManager {
	extensions = {
		test: {
			Middleware: (req, res, next) => {},
			Name: "",
			Path: "test",
			Method: "",
			Enabled: true,
		},
	};

	constructor() {
		this.extensions = {};
		fs.readdirSync(DEFAULT_EXTENSIONS_DIR)
			.filter(
				(val) =>
					fs.statSync(`${DEFAULT_EXTENSIONS_DIR}/${val}`).isFile() &&
					val.endsWith(".js"),
			)
			.forEach((val) => {
				const ext = require(`../${DEFAULT_EXTENSIONS_DIR}/${val}`);
				this.extensions[ext.Path] = ext;
			});
	}

	Middleware = Router().use(
		DEFAULT_EXTENSIONS_ROUTING_PATH,
		Router().use("/:path", (req, res, next) => {
			if (!req?.isAuthenticated)
				return new ErrorResponser(res).send("Yetki Reddedildi.", 403);
			else next();
			var ext = this.extensions[req.path.slice(1)];
			if (ext !== undefined && ext?.Method?.toUpperCase() === req.method) {
				if (ext.Enabled === true) ext.Middleware(req, res, next);
				else new ErrorResponser(res).send("Extension not enabled.");
			} else new ErrorResponser(res).send("Extension not found.");
		}),
	);
}
