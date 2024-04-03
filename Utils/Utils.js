import express from "express";
import { DEFAULT_LOG_FORMAT } from "../consts";

export default class {
	static getObjectLength(obj) {
		return Object.keys(obj).length;
	}

	static Format(formatText = DEFAULT_LOG_FORMAT, request = express.request) {
		return formatText
			.split(":")
			.map((val) => {
				switch (val) {
					case "D":
						return new Date().toLocaleString("tr");
						break;
					case "P":
						return request.path;
						break;
					case "M":
						return request.method;
						break;
					case "Q":
						return JSON.stringify(request.query);
						break;
					case "B":
						return JSON.stringify(request.body);
						break;
					case "I":
						return request.ip;
						break;
				}
			})
			.join("  ");
	}

	static checkParameters(method, request = express.request, ...parameters) {
		var requiredParameterNotFound = false;
		parameters.forEach((val) => {
			switch (method) {
				case "post":
					if (!request.body[val]) return (requiredParameterNotFound = true);
					break;
				case "get":
					if (!request.query[val]) return (requiredParameterNotFound = true);
					break;
			}
		});
		return !requiredParameterNotFound;
	}
}
