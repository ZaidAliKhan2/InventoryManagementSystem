import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Item = mongoose.model("Item", ItemSchema, "Items");
