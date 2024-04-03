import { Router } from "express";
import Utils from "../../Utils/Utils";
import ErrorResponser from "../../Classes/Error.js";
import SuccessResponser from "../../Classes/Success.js";
import { DEFAULT_PASSWORD, TOKEN } from "../../consts.js";
import CookieManager from "../../Classes/CookieManager.js";

export default Router()
	.post("/login", (req, res, next) => {
		if (Utils.checkParameters("post", req, "password")) {
			if (DEFAULT_PASSWORD === req.body?.password)
				new CookieManager(req, res).set("token", TOKEN) &
					new SuccessResponser(res).send("/");
			else new ErrorResponser(res).send("Geçersiz Şifre.");
		} else new ErrorResponser(res).send("Geçersiz Parametre(ler).");
	})
	.get("/login", (req, res, next) => {
		if (req.cookies?.token === TOKEN) {
			res.cookie("token", "");
			new SuccessResponser(res).send("Başarıyla çıkış yapıldı.");
		} else {
			res.cookie("token", TOKEN);
			new SuccessResponser(res).send("Başarıyla giriş yapıldı.");
		}
	});
