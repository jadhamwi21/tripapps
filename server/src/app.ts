import express from "express";
import dotenv from "dotenv";
import * as path from "path";
import { connectToDatabase } from "./models";
import { SeedsController } from "./controllers/seeds.controller";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { CountriesRouter } from "./routers/countries.router";
import cors from "cors";
import { CitiesRouter } from "./routers/cities.router";
import { App } from "./models/apps.model";
import { IApp } from "./ts/interfaces/apps.interfaces";
import { StatusCodes } from "http-status-codes";

(async function () {
  dotenv.config({ path: path.join(__dirname, "../.env") });
  await connectToDatabase();
  const app = express();

  app.use(cors({ origin: "http://localhost:3000" }));
  app.get("/seeds", SeedsController.getSeedsHandler);

  app.use("/countries", CountriesRouter);
  app.use("/cities", CitiesRouter);

  app.get("/apps", async (req, res, next) => {
    const apps: IApp[] = await App.find({});

    return res.status(StatusCodes.OK).send(apps);
  });

  app.use(ErrorMiddleware);

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
})();
