import fs from "fs";
import fsex from "fs-extra";
import processor from "child_process";
import { getFileCreatedAt } from "../const-funcs";
import { DEFAULT_OVERWRITE } from "../consts";

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

	static Read(path = "") {
		return fs.readFileSync(FileManager.Normalize(path), "utf8");
	}

	static Write(path, data) {
		try {
			fs.writeFileSync(FileManager.Normalize(path), data);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	static Delete(path, type = "file") {
		try {
			if (type === "file") fs.unlinkSync(FileManager.Normalize(path));
			else if (type === "folder")
				fs.rmdirSync(FileManager.Normalize(path), { recursive: true });
			else return false;
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	static Create(path, type = "file") {
		try {
			if (type === "file") fs.writeFileSync(FileManager.Normalize(path), "");
			else if (type === "folder")
				fs.mkdirSync(FileManager.Normalize(path), { recursive: true });
			else return false;
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	static Rename(path = "", newPath = "") {
		try {
			fs.cpSync(FileManager.Normalize(path), FileManager.Normalize(newPath), {
				force: true,
				recursive: true,
				errorOnExist: true,
			});
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	static Move(sourcePath, destinationPath) {
		try {
			fsex.moveSync(
				FileManager.Normalize(sourcePath),
				FileManager.Normalize(
					`${destinationPath}/${sourcePath.split("/").pop()}`,
				),
				{
					overwrite: DEFAULT_OVERWRITE,
				},
			);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	static Exist(path = "") {
		try {
			return fs.existsSync(FileManager.Normalize(path));
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	static Normalize(path = "") {
		return path.replaceAll("..", "");
	}
}
