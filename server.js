import express from "express";
import mongoose from "mongoose";
import { router } from "./Router/inventoryRoutes.js";
const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/InventoryDB");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/inventory", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
