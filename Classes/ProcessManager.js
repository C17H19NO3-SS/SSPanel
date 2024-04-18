import cp from "node:child_process";
import fs from "fs";
import {
	DEFAULT_PROCESS_LOG_DELETE_TIMEOUT,
	DEFAULT_PROCESS_LOG_DIR,
	PROJECT_DIRECTORY,
} from "../consts";

export const Processes = {};

export default class ProcessManager {
	static Spawn(command = "") {
		var cmd = command.split(" ");
		const proc = cp.spawn(cmd.shift(), cmd, {
			stdio: ["pipe", "pipe", "pipe"],
			shell: "/bin/bash",
		});

		proc.stdout.on("data", (data) => {
			try {
				fs.appendFileSync(
					`${PROJECT_DIRECTORY}/Logs/Process-${proc.pid}.txt`,
					`SUCCESS: ${data.toString()}\n`,
				);
			} catch (err) {
				console.error(err);
				fs.writeFileSync(
					`${PROJECT_DIRECTORY}/Logs/Process-${proc.pid}.txt`,
					`SUCCESS: ${data.toString()}\n`,
				);
			}
		});

		proc.stderr.on("data", (data) => {
			try {
				fs.appendFileSync(
					`${PROJECT_DIRECTORY}/Logs/Process-${proc.pid}.txt`,
					`ERROR: ${data.toString()}\n`,
				);
			} catch (err) {
				fs.writeFileSync(
					`${PROJECT_DIRECTORY}/Logs/Process-${proc.pid}.txt`,
					`ERROR: ${data.toString()}\n`,
				);
			}
		});

		proc.on("exit", (statusCode) => {
			delete Processes[proc.pid];
			setTimeout(() => {
				fs.rmSync(`${PROJECT_DIRECTORY}/Logs/Process-${proc.pid}.txt`);
			}, DEFAULT_PROCESS_LOG_DELETE_TIMEOUT);
		});

		Processes[proc.pid] = proc;
		return proc;
	}

	static Restart(pid) {
		const cmd = Processes[pid];
		ProcessManager.Kill(pid);
		delete Processes[pid];
		return ProcessManager.Spawn(cmd.spawnargs.join(" "));
	}

	static Exists(pid) {
		return Processes[pid] !== undefined;
	}

	static Kill(pid) {
		Processes[pid].kill();
		delete Processes[pid];
	}

	static GetProcess(pid) {
		return Processes[pid];
	}

	static GetProcesses() {
	    var obj = {};
	    for(const [key, value] of Object.entries(Processes)) {
	        obj[key] = {};
	        obj[key].log = fs.existsSync(`${DEFAULT_PROCESS_LOG_DIR}/Process-${value?.pid}.txt`) ? fs.readFileSync(`${DEFAULT_PROCESS_LOG_DIR}/Process-${value?.pid}.txt`) : "";
	    }
		return obj;
	}
}
