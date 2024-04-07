import { Router } from "express";
import Utils from "../../Utils/Utils";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";
import FileManager from "../../Classes/FileManager";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts";

export default Router().post("/create", (req, res, next) => {
	if (!Utils.checkParameters("post", req, "dir", "type"))
		return new ErrorResponser(res).send(req.i18n.t("parameters.invalid"));
	if (!FileManager.Exist(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`))
		return new ErrorResponser(res).send(req.i18n.t("file.alreadyExist"));
	if (
		FileManager.Create(
			FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`),
			req.body.type,
		) === true
	) {
		new SuccessResponser(res).send(true);
	} else new ErrorResponser(res).send(req.i18n.t("catch.error"));
});
