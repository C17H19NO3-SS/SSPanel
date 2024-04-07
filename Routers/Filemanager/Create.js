import { Router } from "express";
import Utils from "../../Utils/Utils";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";
import FileManager from "../../Classes/FileManager";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts";

export default Router().post("/create", (req, res, next) => {
	if (!Utils.checkParameters("post", req, "dir", "type"))
		return new ErrorResponser(res).send("Invalid path.");
	if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`))
		return new ErrorResponser(res).send("File already exists.");
	if (
		FileManager.Create(
			FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`),
			req.body.type,
		) === true
	) {
		new SuccessResponser(res).send(true);
	} else new ErrorResponser(res).send("An error occurred try again later.");
});
