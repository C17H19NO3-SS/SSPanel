import crypto from "crypto";

export const PROJECT_DIRECTORY = import.meta.url.slice(
	"file://".length,
	-"consts.js".length,
);

export const DEFAULT_PORT = 1001;

export const DEFAULT_HOST = "0.0.0.0";

export const DEFAULT_LOG_FILE = `${PROJECT_DIRECTORY}log.txt`;

export const DEFAULT_ERROR_LOG_FILE = "error.log.txt";

export const DEFAULT_LOG_FORMAT = "D:P:M:B:Q:I"; // Date:Path,Method,Post,Query

export const DEFAULT_LOG_FILE_BACKUP_DIR = `${PROJECT_DIRECTORY}Logs`;

export const DEFAULT_LOOPS_DIR = `${PROJECT_DIRECTORY}Loops`;

export const DEFAULT_FILEMANAGER_DIR = `${PROJECT_DIRECTORY}files`;

export const DEFAULT_OVERWRITE = true;

export const DEFAULT_PASSWORD = "{login:'success',}";

export const DEFAULT_PROCESS_USER = 1000;

export const DEFAULT_PROCESS_LOG_DELETE_TIMEOUT = 1000 * 60 * 60 * 24 * 3; // 3 day

export const DEFAULT_PROCESS_SCRIPT_DELETE_TIMEOUT = 1000 * 60 * 60; // 1 hour

export const TOKEN = crypto.randomBytes(64).toString("hex");
