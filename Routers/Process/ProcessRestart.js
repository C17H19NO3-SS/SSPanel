import { Router } from "express";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";
import Utils from "../../Utils/Utils";

export default Router().get("/restartprocess", (req, res, next) => {
	try {
		if (!Utils.checkParameters("get", req, "pid"))
			return new ErrorResponser(res).send(req.i18n.t("process.pid.invalid"));
		return new SuccessResponser(res).send(
			req.ProcessManager.Restart(req.query.pid).pid,
		);
	} catch (err) {
		console.error(err);
		return new ErrorResponser(res).send(req.i18n.t("catch.error"));
	}
});
