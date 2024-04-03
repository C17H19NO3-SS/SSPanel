import { Router } from "express";
import AuthController from "../../Classes/AuthController.js";

export default Router().use((req, res, next) => {
	req.isAuthenticated = AuthController.isAuthanticated(req) ? true : false;
	next();
});
