import { model, Schema } from "mongoose";

const locationSchema = new Schema({
	country: { type: String, required: true },
	cities: [String],
});

export const Location = model("locations", locationSchema);
