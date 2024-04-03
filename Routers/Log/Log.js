import { Router } from "express";
import fs from "fs";
import Utils from "../../Utils/Utils";
import { DEFAULT_LOG_FILE, DEFAULT_LOG_FORMAT } from "../../consts";

export default Router().use((req, res, next) => {
	try {
		fs.appendFileSync(
			DEFAULT_LOG_FILE,
			`${Utils.Format(DEFAULT_LOG_FORMAT, req)}\n`,
		);
	} catch (err) {
		fs.writeFileSync(
			DEFAULT_LOG_FILE,
			`${Utils.Format(DEFAULT_LOG_FORMAT, req)}\n`,
		);
	}
	next();
});
