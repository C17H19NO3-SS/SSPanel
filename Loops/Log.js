import fs from "fs";
import { DEFAULT_LOG_FILE, DEFAULT_LOG_FILE_BACKUP_DIR } from "../consts";

export const Loop = () => {
	const log = fs.readFileSync(DEFAULT_LOG_FILE);
	fs.writeFileSync(
		`${DEFAULT_LOG_FILE_BACKUP_DIR}/log-${Date.now().toString()}.txt`,
		log,
	);
	fs.unlinkSync(DEFAULT_LOG_FILE);
};

export const LoopInterval = 1000 * 60 * 60 * 24;
