import { Router } from "express";
import Utils from "../../Utils/Utils";
import FileManager from "../../Classes/FileManager";
import SuccessResponser from "../../Classes/Success";
import ErrorResponser from "../../Classes/Error";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts";

export default Router().post("/copy", (req, res, next) => {
	try {
		if (!Utils.checkParameters("post", req, "dir", "newDir"))
			return new ErrorResponser(res).send("Invalid parameters.");
		if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`))
			return new ErrorResponser(res).send("File not found.");
		if (FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.body.newDir}`))
			return new ErrorResponser(res).send("Directory already exists.");
		if (
			FileManager.Copy(
				FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`),
				FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.body.newDir}`),
			)
		) {
			new SuccessResponser(res).send(true);
		} else new ErrorResponser(res).send("Failed to copy file.");
	} catch (err) {
		console.error(err);
		return new ErrorResponser(res).send("An error occurred try again later.");
	}
});
