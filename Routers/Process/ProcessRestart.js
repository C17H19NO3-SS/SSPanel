import { Router } from "express";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";
import Utils from "../../Utils/Utils";

export default Router().get("/restartprocess", (req, res, next) => {
	try {
		if (!Utils.checkParameters("get", req, "pid"))
			return new ErrorResponser(res).send("Invalid Process ID.");
		return new SuccessResponser(res).send(
			req.ProcessManager.Restart(req.query.pid).pid,
		);
	} catch (err) {
		console.error(err);
		return new ErrorResponser(res).send("An error occurred try again later.");
	}
});
