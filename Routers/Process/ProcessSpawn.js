import { Router } from "express";
import ProcessManager from "../../Classes/ProcessManager";
import Utils from "../../Utils/Utils";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";

export default Router().post("/processspawn", (req, res, next) => {
	try {
		if (!Utils.checkParameters("post", req, "command"))
			return new ErrorResponser(res).send(req.i18n.t("parameters.invalid"));
		new SuccessResponser(res).send(
			req.ProcessManager.Spawn(req.body.command).pid,
		);
	} catch (err) {
		console.error(err);
		return new ErrorResponser(res).send(req.i18n.t("catch.error"));
	}
});
