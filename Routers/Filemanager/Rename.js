import { Router } from "express";
import FileManager from "../../Classes/FileManager";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts";
import Utils from "../../Utils/Utils";

export default Router().post("/rename", (req, res, next) => {
	if (!Utils.checkParameters("post", req, "dir", "name"))
		return new ErrorResponser(res).send(req.i18n.t("parameters.invalid"));
	if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`))
		return new ErrorResponser(res).send(req.i18n.t("file.notFound"));
	else if (FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.body.name}`))
		return new ErrorResponser(res).send(req.i18n.t("file.alreadyExist"));
	if (
		FileManager.Rename(
			`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`,
			`${DEFAULT_FILEMANAGER_DIR}/${req.body.name}`,
		)
	) {
		new SuccessResponser(res).send(true);
	} else new ErrorResponser(res).send(req.i18n.t("catch.error"));
});
