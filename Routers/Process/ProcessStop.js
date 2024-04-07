import { Router } from "express";
import Utils from "../../Utils/Utils";
import ErrorResponser from "../../Classes/Error";
import ProcessManager from "../../Classes/ProcessManager";
import SuccessResponser from "../../Classes/Success";

export default Router().get("/stopprocess", (req, res, next) => {
	try {
		if (!Utils.checkParameters("get", req, "pid"))
			return new ErrorResponser(res).send(req.i18n.t("process.pid.invalid"));
		req.ProcessManager.Kill(req.body.pid);
		return new SuccessResponser(res).send(req.i18n.t("process.stoped"));
	} catch (err) {
		console.error(err);
		return new ErrorResponser(res).send(req.i18n.t("catch.error"));
	}
});
