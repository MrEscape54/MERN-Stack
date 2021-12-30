require("dotenv").config();
import express from "express";
import devBundle from "./devBundle";
import template from "./../template";
import path from "path";
import { MongoClient } from "mongodb";

const app = express();
const CURRENT_WORKING_DIR = process.cwd();
let port = process.env.PORT || 3000;

devBundle.compile(app);
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
app.get("/", (req, res) => {
  res.status(200).send(template());
});

const url =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mernSimpleSetup";
MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected successfully to mongodb server");
  db.close();
});

app.listen(port, function onStart(err) {
  if (err) {
    console.error(err);
  }
  console.info("Server started on port %s.", port);
});
