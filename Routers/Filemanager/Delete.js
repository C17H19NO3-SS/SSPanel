import { Router } from "express";
import ErrorResponser from "../../Classes/Error";
import FileManager from "../../Classes/FileManager";
import SuccessResponser from "../../Classes/Success";
import Utils from "../../Utils/Utils";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts";

export default Router().get("/delete", (req, res, next) => {
	try {
		if (!Utils.checkParameters("get", req, "dir"))
			return new ErrorResponser(res).send("Invalid parameters.");
		if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.query.dir}`))
			return new ErrorResponser(res).send("Directory not found.");
		new SuccessResponser(res).send(
			FileManager.Delete(
				FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.query?.dir}`),
			),
		);
	} catch (err) {
		console.error(err);
		new ErrorResponser(res).send("Geçersiz dizin.");
	}
});
