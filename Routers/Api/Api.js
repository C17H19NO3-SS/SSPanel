import { Router } from "express";
import ErrorResponser from "../../Classes/Error";
import FileList from "../Filemanager/FileList";
import File from "../Filemanager/File";

export default Router().use(
	"/api",
	Router()
		.use("/*", (req, res, next) => {
			if (!req?.isAuthenticated)
				return new ErrorResponser(res).send("Yetki Reddedildi.", 403);
			else next();
		})
		.use(FileList)
		.use(File),
);
