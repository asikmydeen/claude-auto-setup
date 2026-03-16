import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import "./passport.js";
import { dirname } from "path";
import * as fs from "fs";
import {
  itemRoutes,
  userRoutes,
  meRoutes,
  authRoutes,
  roleRoutes,
  uploadRoutes,
  categoryRoutes,
  tagRoutes,
  permissionRoutes,
  imageRoutes,
} from "./routes";
import { dbConnect } from "./mongoose";
import path from "path";

import { ExtractJwt } from "passport-jwt";
import passportJWT from "passport-jwt";
import passport from "passport";
import cron from "node-cron";
import ReseedAction from "./mongoose/RessedAction";

import { userModel } from "./schemas/user.schema";
const JWTStrategy = passportJWT.Strategy;

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

const whitelist = [process.env.APP_URL_CLIENT];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

dbConnect();

app.use(cors(corsOptions));
app.use(bodyParser.json({ type: "application/vnd.api+json", strict: false }));

app.get("/", function (req, res) {
  const __dirname = fs.realpathSync(".");
  res.sendFile(path.join(__dirname, "/src/landing/index.html"));
});

app.use("/", authRoutes);
app.use("/me", meRoutes);
app.use("/uploads", uploadRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/categories", categoryRoutes);
app.use("/tags", tagRoutes);
app.use("/items", itemRoutes);
app.use("/permissions", permissionRoutes);
app.use("/public/images", imageRoutes);

if (process.env.SCHEDULE_HOUR) {
  cron.schedule(`0 */${process.env.SCHEDULE_HOUR} * * *'`, () => {
    ReseedAction();
  });
}

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
