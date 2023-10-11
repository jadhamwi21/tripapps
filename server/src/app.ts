import express from "express";
import dotenv from "dotenv";
import * as path from "path";
import { connectToDatabase } from "./models";
import { SeedsController } from "./controllers/seeds.controller";
import { ErrorMiddleware } from "./middlewares/error.middleware";

import cors from "cors";

import { AppsRouter } from "./routers/apps.router";
import morgan from "morgan";

(async function () {
	dotenv.config({ path: path.join(__dirname, "../.env") });
	await connectToDatabase();
	const app = express();

	app.use(morgan("combined"));
	app.use(cors({ origin: "http://localhost:3000" }));

	app.get("/seeds", SeedsController.getSeedsHandler);

	app.use("/apps", AppsRouter);

	app.use("/icons", express.static(path.join(__dirname, "./assets/icons")));

	app.use(ErrorMiddleware);

	app.listen(process.env.PORT, () => {
		console.log(`Listening on ${process.env.PORT}`);
	});
})();
