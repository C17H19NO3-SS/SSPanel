import { Router } from "express";
import ErrorResponser from "../../Classes/Error";
import FileManager from "../../Classes/FileManager";
import SuccessResponser from "../../Classes/Success";
import Utils from "../../Utils/Utils";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts";

export default Router().post("/delete", (req, res, next) => {
	try {
		if (!Utils.checkParameters("post", req, "dir"))
			return new ErrorResponser(res).send(req.i18n.t("parameters.invalid"));
		if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`))
			return new ErrorResponser(res).send(
				req.i18n.t("file.directory.notFound"),
			);
		new SuccessResponser(res).send(
			FileManager.Delete(
				FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.body?.dir}`),
			),
		);
	} catch (err) {
		console.error(err);
		new ErrorResponser(res).send(req.i18n.t("catch.error"));
	}
});
