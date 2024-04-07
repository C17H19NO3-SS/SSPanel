import { Router } from "express";
import { DEFAULT_THEME_FOLDER, DEFAULT_THEME_NAME } from "../../consts";
import fs from "fs";

export default Router().use((req, res, next) => {
	if (fs.existsSync(`${DEFAULT_THEME_FOLDER}/${DEFAULT_THEME_NAME}${req.path}`))
		res.render(req.path.slice(1), req.ThemeVariables);
	else next();
});
