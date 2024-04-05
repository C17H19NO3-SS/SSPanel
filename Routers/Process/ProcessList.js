import { Router } from "express";
import SuccessResponser from "../../Classes/Success";
import ProcessManager from "../../Classes/ProcessManager";

export default Router().get("/processlist", (req, res, next) => {
	return new SuccessResponser(res).send(ProcessManager.GetProcesses());
});
