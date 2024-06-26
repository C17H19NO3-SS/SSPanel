import express from "express";

export default class ErrorResponser {
	constructor(response = express.response) {
		this.response = response;
	}

	send(error = "", statusCode = 500) {
		this.response.status(statusCode).json({
			success: false,
			error,
		});
	}
}
