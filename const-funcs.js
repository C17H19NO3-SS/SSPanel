import processor from "child_process";

export const getFileCreatedAt = (file) => {
	var line = processor
		.execSync(`stat ${file}`)
		.toString()
		.split("\n")[7]
		.split(":");
	line.shift();
	return new Date(line.join(":")).toLocaleString("tr");
};
