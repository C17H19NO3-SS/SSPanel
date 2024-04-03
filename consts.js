import crypto from "crypto";

const imp = import.meta.url.slice("file://".length, -"consts.js".length);

export const DEFAULT_PORT = 1001;

export const DEFAULT_HOST = "0.0.0.0";

export const DEFAULT_LOG_FILE = `${imp}log.txt`;

export const DEFAULT_LOG_FORMAT = "D:P:M:B:Q:I"; // Date:Path,Method,Post,Query

export const DEFAULT_LOG_FILE_BACKUP_DIR = `${imp}Logs`;

export const DEFAULT_LOOPS_DIR = `${imp}Loops`;

export const DEFAULT_FILEMANAGER_DIR = `${imp}files`;

export const DEFAULT_PASSWORD = "{login:'success',}";

export const TOKEN = crypto.randomBytes(64).toString("hex");
