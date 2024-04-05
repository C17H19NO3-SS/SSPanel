import { Router } from "express";
import ErrorResponser from "../../Classes/Error.js";
import Utils from "../../Utils/Utils.js";
import SuccessResponser from "../../Classes/Success.js";
import FileManager from "../../Classes/FileManager.js";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts.js";

export default Router().get("/read", (req, res, next) => {
	try {
		if (!Utils.checkParameters("get", req, "dir")) req.query.dir = "";
		if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.query.dir}`))
			return new ErrorResponser(res).send("Directory not found.");
		new SuccessResponser(res).send(
			FileManager.Read(
				FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.query.dir}`),
				200,
			),
		);
	} catch (err) {
		console.error(err);
		new ErrorResponser(res).send("Geçersiz dizin.");
	}
});
