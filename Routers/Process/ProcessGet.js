import { Router } from "express";
import Utils from "../../Utils/Utils";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";

export default Router().get("/getprocess", (req, res, next) => {
	try {
		if (!Utils.checkParameters("get", req, "pid"))
			return new ErrorResponser(res).send("Invalid PID.");
		if (!req.ProcessManager.Exists(req.query.pid))
			return new ErrorResponser(res).send("Process not found.");
		new SuccessResponser(res).send(
			req.ProcessManager.GetProcess(req.query.pid),
		);
	} catch (err) {
		console.error(err);
		return new ErrorResponser(res).send("An error occurred train again later.");
	}
});
