import { Router } from "express";
import ErrorResponser from "../../Classes/Error";
import FileList from "../Filemanager/FileList";
import Read from "../Filemanager/Read";
import Write from "../Filemanager/Write";
import Delete from "../Filemanager/Delete";
import DeleteDir from "../Filemanager/DeleteDir";
import Create from "../Filemanager/Create";
import Rename from "../Filemanager/Rename";
import Copy from "../Filemanager/Copy";
import Move from "../Filemanager/Move";

export default Router().use(
	"/api",
	Router()
		.use("/*", (req, res, next) => {
			if (!req?.isAuthenticated)
				return new ErrorResponser(res).send("Yetki Reddedildi.", 403);
			else next();
		})
		.use(FileList)
		.use(Read)
		.use(Write)
		.use(Delete)
		.use(DeleteDir)
		.use(Create)
		.use(Rename)
		.use(Copy)
		.use(Move),
);
