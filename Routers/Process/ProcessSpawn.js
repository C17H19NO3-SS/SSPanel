import { Router } from "express";
import ProcessManager from "../../Classes/ProcessManager";
import Utils from "../../Utils/Utils";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";

export default Router().get("/processspawn", (req, res, next) => {
	try {
		if (!Utils.checkParameters("get", req, "command"))
			return new ErrorResponser(res).send("Invalid parameters.");
		new SuccessResponser(res).send(ProcessManager.Spawn(req.query.command).pid);
	} catch (err) {
		console.error(err);
		return new ErrorResponser(res).send("An error occurred try again later.");
	}
});
