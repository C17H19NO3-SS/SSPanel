import { Router } from "express";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";
import Utils from "../../Utils/Utils";
import ProcessManager from "../../Classes/ProcessManager";

export default Router().get("/restartprocess", (req, res, next) => {
	try {
		if (!Utils.checkParameters("post", req, "pid"))
			return new ErrorResponser(res).send("Invalid Process ID.");
		return new SuccessResponser(res).send(
			ProcessManager.Restart(req.body.pid).pid,
		);
	} catch (err) {
		console.error(err);
		return new ErrorResponser(res).send("An error occurred try again later.");
	}
});
