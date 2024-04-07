import cp from "child_process";
import fs from "fs";
import {
	DEFAULT_PROCESS_LOG_DELETE_TIMEOUT,
	DEFAULT_PROCESS_USER,
	PROJECT_DIRECTORY,
} from "../consts";

export const Processes = {};

export default class ProcessManager {
	static Spawn(command = "") {
		const id = Math.floor(Math.random() * 10000 * Math.random());
		var cmd = command.split(" ");
		const proc = cp.spawn(cmd.shift(), cmd, {
			stdio: ["pipe", "pipe", "pipe"],
			uid: DEFAULT_PROCESS_USER,
			gid: DEFAULT_PROCESS_USER,
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
				console.error(err);
				fs.writeFileSync(
					`${PROJECT_DIRECTORY}/Logs/Process-${proc.pid}.txt`,
					`ERROR: ${data.toString()}\n`,
				);
			}
		});

		proc.on("exit", () => {
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
		return Processes;
	}
}
