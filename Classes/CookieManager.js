import express from "express";

export default class CookieManager {
	constructor(request = express.request, response = express.response) {
		this.request = request;
		this.response = response;
	}

	set(name, value) {
		this.response.cookie(name, value);
	}

	get(name) {
		return this.request.cookies[name];
	}
}
