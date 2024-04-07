import { Router } from "express";
import SuccessResponser from "../../Classes/Success";

export default Router().get("/processlist", (req, res, next) => {
	return new SuccessResponser(res).send(req.Processes);
});
