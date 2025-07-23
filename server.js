import express from "express";
import mongoose from "mongoose";
import { router } from "./Router/inventoryRoutes.js";
const app = express();
const port = 3000;

mongoose.connect(
  "mongodb+srv://zaidalikhan2005148:DBzaidAliKhan3456@cluster0.flvqkmr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/inventory"
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
