import { Router } from "express";
import FileManager from "../../Classes/FileManager";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts";
import Utils from "../../Utils/Utils";

export default Router().get("/rename", (req, res, next) => {
	if (!Utils.checkParameters("get", req, "dir", "name"))
		return new ErrorResponser(res).send("Invalid parameters.");
	if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.query.dir}`))
		return new ErrorResponser(res).send("File not found.");
	else if (FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.query.name}`))
		return new ErrorResponser(res).send("File already exists.");
	if (
		FileManager.Rename(
			`${DEFAULT_FILEMANAGER_DIR}/${req.query.dir}`,
			`${DEFAULT_FILEMANAGER_DIR}/${req.query.name}`,
		)
	) {
		new SuccessResponser(res).send(true);
	} else new ErrorResponser(res).send("Failed to rename file.");
});
