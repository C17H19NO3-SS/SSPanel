import { Router } from "express";
import Utils from "../../Utils/Utils";

export default Router().get("/copy", (req, res, next) => {
	if (!Utils.checkParameters("get", req, "dir", "newDir"))
		return new ErrorResponser(res).send("Invalid parameters.");
	if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.query.dir}`))
		return new ErrorResponser(res).send("File not found.");
	if (FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.query.newDir}`))
		return new ErrorResponser(res).send("Directory already exists.");
	if (
		FileManager.Copy(
			FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.query.dir}`),
			FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.query.newDir}`),
		)
	) {
		new SuccessResponser(res).send(true);
	} else new ErrorResponser(res).send("Failed to copy file.");
});
