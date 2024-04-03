import fs from "fs";
import processor from "child_process";
import { getFileCreatedAt } from "../const-funcs";

export default class FileManager {
	static GetFiles(path = "") {
		return fs.readdirSync(FileManager.Normalize(path)).map((file) => {
			return {
				type: fs.statSync(`${path}/${file}`).isFile() ? "file" : "folder",
				name: file,
				path: `${FileManager.Normalize(
					path.endsWith("/") ? path : `${path}/`,
				)}${file}`,
				size: fs.statSync(`${path}/${file}`).size,
				lastModified: new Date(
					fs.statSync(`${path}/${file}`).mtime,
				).toLocaleString("tr"),
				created: getFileCreatedAt(`${path}/${file}`),
				owner: processor
					.execSync(`getent passwd ${fs.statSync(`${path}/${file}`).uid}`)
					.toLocaleString()
					.split(":")[0],
				permissions: processor
					.execSync(`stat -c %a ${path}/${file}`)
					.toLocaleString(),
			};
		});
	}

	static Read(path) {
		return fs.readFileSync(FileManager.Normalize(path), "utf8");
	}

	static Write(path, data) {
		fs.writeFileSync(FileManager.Normalize(path), data);
	}

	static Normalize(path = "") {
		return path.replaceAll("..", "");
	}
}
