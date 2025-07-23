import express from "express";
import { Item } from "../schemas/model.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  const { sort } = req.query;
  const sortObj = sort ? { [sort]: 1 } : {};
  const items = await Item.find().sort(sortObj);
  res.render("index", { items, editId: null });
});

router.post("/addItem", async (req, res) => {
  const { itemName, quantity, category } = req.body;
  const item = new Item({ name: itemName, quantity, category });
  await item.save();
  res.status(200).send("Item saved");
});

router.post("/deleteItem", async (req, res) => {
  const { itemId } = req.body;
  await Item.deleteOne({ _id: itemId });
  res.redirect("/inventory");
});

router.post("/updateItem", async (req, res) => {
  const { itemId, itemName, itemQuantity, itemCategory } = req.body;

  try {
    await Item.findByIdAndUpdate(itemId, {
      name: itemName,
      quantity: itemQuantity,
      category: itemCategory,
    });
    res.redirect("/inventory");
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).send("Failed to update item.");
  }
});

router.post("/", async (req, res) => {
  const searchValue = req.body.search; // Assuming <input name="search" />
  try {
    const regex = new RegExp(searchValue, "i"); // case-insensitive

    const items = await Item.find({
      $or: [
        { name: regex },
        { category: regex },
        { quantity: isNaN(searchValue) ? undefined : parseInt(searchValue) },
      ],
    });

    res.render("index", { items, editId: null });
  } catch (err) {
    console.error("Error finding item:", err);
    res.status(500).send("Failed to find item.");
  }
});
