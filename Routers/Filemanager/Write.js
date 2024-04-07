import { Router } from "express";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";
import Utils from "../../Utils/Utils";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts";
import FileManager from "../../Classes/FileManager";

export default Router().post("/write", (req, res, next) => {
	try {
		if (!Utils.checkParameters("post", req, "dir", "content"))
			return new ErrorResponser(res).send("Invalid parameters.");
		if (
			FileManager.Write(
				FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.body?.dir}`),
				req.body?.content,
			) === true
		)
			new SuccessResponser(res).send(true);
		else new ErrorResponser(res).send(`Failed to write file.`);
	} catch (err) {
		console.error(err);
		new ErrorResponser(res).send("An error occurred try again later.");
	}
});
