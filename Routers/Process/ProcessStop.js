import { Router } from "express";
import Utils from "../../Utils/Utils";
import ErrorResponser from "../../Classes/Error";
import ProcessManager from "../../Classes/ProcessManager";
import SuccessResponser from "../../Classes/Success";

export default Router().get("/stopprocess", (req, res, next) => {
	try {
		if (!Utils.checkParameters("get", req, "pid"))
			return new ErrorResponser(res).send("Invalid Process ID.");
		ProcessManager.Kill(req.query.pid);
		return new SuccessResponser(res).send("Process Stopped.");
	} catch (err) {
		console.error(err);
		return new ErrorResponser(res).send("An error occurred try again later.");
	}
});
