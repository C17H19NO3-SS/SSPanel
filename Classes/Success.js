import express from "express";

export default class SuccessResponser {
	constructor(response = express.response) {
		this.response = response;
	}

	send(response = "", statusCode = 200) {
		this.response.status(statusCode).json({
			success: true,
			response,
		});
	}
}
