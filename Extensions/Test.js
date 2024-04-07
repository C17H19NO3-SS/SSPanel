import SuccessResponser from "../Classes/Success";

export const Middleware = (req, res, next) => {
	var extObj = {};
	for (const [key, value] of Object.entries(req.Exts)) {
		extObj[key] = {
			Path: value.Path,
			Method: value.Method,
			Enabled: value.Enabled,
			Name: value.Name,
		};
	}
	new SuccessResponser(res).send(extObj);
};

export const Name = "Extension list.";

export const Path = "list";

export const Method = "get";

export const Enabled = true;
