import { Router } from "express";
import Utils from "../../Utils/Utils";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";
import FileManager from "../../Classes/FileManager";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts";

export default Router().get("/create", (req, res, next) => {
	if (!Utils.checkParameters("get", req, "dir", "type"))
		return new ErrorResponser(res).send("Invalid path.");
	if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.query.dir}`))
		return new ErrorResponser(res).send("File already exists.");
	if (
		FileManager.Create(
			FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.query.dir}`),
			req.query.type,
		) === true
	) {
		new SuccessResponser(res).send(true);
	} else new ErrorResponser(res).send("Failed to create file.");
});
