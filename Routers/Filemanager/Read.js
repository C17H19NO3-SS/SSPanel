import { Router } from "express";
import ErrorResponser from "../../Classes/Error.js";
import Utils from "../../Utils/Utils.js";
import SuccessResponser from "../../Classes/Success.js";
import FileManager from "../../Classes/FileManager.js";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts.js";

export default Router().post("/read", (req, res, next) => {
	try {
		if (!Utils.checkParameters("post", req, "dir"))
			return new ErrorResponser(res).send(req.i18n.t("parameters.invalid"));
		if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`))
			return new ErrorResponser(res).send(
				req.i18n.t("file.directory.notFound"),
			);
		new SuccessResponser(res).send(
			FileManager.Read(
				FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`),
				200,
			),
		);
	} catch (err) {
		console.error(err);
		new ErrorResponser(res).send(req.i18n.t("catch.error"));
	}
});
