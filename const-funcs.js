import processor from "child_process";
import express from "express";

export const getFileCreatedAt = (file) => {
	var line = processor
		.execSync(`stat ${file}`)
		.toString()
		.split("\n")[7]
		.split(":");
	line.shift();
	return new Date(line.join(":")).toLocaleString("tr");
};

export const getLanguage = (req) => {
	const acceptLanguage = req.cookies["language"];
	if (acceptLanguage) {
		return acceptLanguage;
	} else {
		return "en";
	}
};
