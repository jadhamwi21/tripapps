import express from "express"
import dotenv from "dotenv"
import * as path from "path";
import {connectToDatabase} from "./models";
import {SeedsController} from "./controllers/seeds.controller";
import {ErrorMiddleware} from "./middlewares/error.middleware";

(async function () {
    dotenv.config({path: path.join(__dirname, "../.env")})
    await connectToDatabase();
    const app = express();

    app.get("/seeds",SeedsController.getSeedsHandler)

    app.use(ErrorMiddleware)

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    })
})();
