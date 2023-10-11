import { model, Schema } from "mongoose";

const categorySchema = new Schema({
	category: { type: String, required: true },
	subcategories: [String],
});

export const Category = model("categories", categorySchema);
