import express, { Router } from "express";

export default Router().use("/static", express.static("Static"));
