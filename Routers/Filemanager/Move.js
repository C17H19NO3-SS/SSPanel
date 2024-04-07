import { Router } from "express";
import FileManager from "../../Classes/FileManager";
import Utils from "../../Utils/Utils";
import ErrorResponser from "../../Classes/Error";
import SuccessResponser from "../../Classes/Success";
import { DEFAULT_FILEMANAGER_DIR } from "../../consts";

export default Router().post("/move", (req, res, next) => {
	try {
		if (!Utils.checkParameters("post", req, "dir", "dir2"))
			return new ErrorResponser(res).send("Invalid parameters.");
		const move = FileManager.Move(
			FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir}`),
			FileManager.Normalize(`${DEFAULT_FILEMANAGER_DIR}/${req.body.dir2}`),
		);
		if (typeof move === "string") return new ErrorResponser(res).send(move);
		else if (move === false)
			return new ErrorResponser(res).send("Failed to move file.");
		else return new SuccessResponser(res).send(true);
	} catch (error) {
		console.error(error);
		return new ErrorResponser(res).send("An error occurred try again later.");
	}
});
