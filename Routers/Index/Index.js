import { Router } from "express";
import fs from "fs";
import { TOKEN } from "../../consts";

export default Router().use((req, res, next) => {
	const path = req.path;
	if (req.path === "/login.ejs" && req.cookies?.token === TOKEN)
		return res.redirect("/");
	else if (req.path !== "/login.ejs" && req.cookies?.token !== TOKEN)
		return res.redirect("/login.ejs");
	if (path.endsWith("/") && fs.existsSync(`views${path}index.ejs`))
		res.render(`${path.slice(1)}index`);
	else if (fs.existsSync(`views${path}/index`))
		res.render(`${path.slice(1)}/index`);
	else if (fs.existsSync(`views${path}`)) res.render(`${path.slice(1)}`);
	else next();
});
