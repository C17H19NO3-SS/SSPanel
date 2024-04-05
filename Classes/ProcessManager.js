import cp from "child_process";
import fs from "fs";
import {
	DEFAULT_PROCESS_LOG_DELETE_TIMEOUT,
	DEFAULT_PROCESS_SCRIPT_DELETE_TIMEOUT,
	DEFAULT_PROCESS_USER,
	PROJECT_DIRECTORY,
} from "../consts";

const Processes = {};

export default class ProcessManager {
	static Spawn(command = "") {
		const id = Math.floor(Math.random() * 10000 * Math.random());
		fs.writeFileSync(`Scripts/scr-${id}.sh`, command);
		const proc = cp.spawn("bash", [`Scripts/scr-${id}.sh`], {
			stdio: ["pipe", "pipe", "pipe"],
			uid: DEFAULT_PROCESS_USER,
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
				fs.rmSync(`Scripts/scr-${id}.sh`);
			}, DEFAULT_PROCESS_SCRIPT_DELETE_TIMEOUT);
			setTimeout(() => {
				fs.rmSync(`${PROJECT_DIRECTORY}/Logs/Process-${proc.pid}.txt`);
			}, DEFAULT_PROCESS_LOG_DELETE_TIMEOUT);
		});

		Processes[proc.pid] = proc;
		return proc;
	}

	static Restart(pid) {
		var cmd = ProcessManager.GetProcess(pid);
		cmd.kill();
		delete Processes[pid];
		return ProcessManager.Spawn(cmd.spawnargs.join(" "));
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
