import express from "express";
import { TOKEN } from "../consts";

export default class AuthController {
	static isAuthanticated(request = express.request) {
		return request.cookies?.token === TOKEN;
	}
}
