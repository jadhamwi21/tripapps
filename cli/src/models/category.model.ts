import {model, Schema} from "mongoose"
import {titlize} from "../utils/utils";


const categorySchema = new Schema({
  category: {type: String, required: true},
  subcategories: [String]
})


categorySchema.pre("save", async function (next) {

  this.category = titlize(this.category);
  if (this.subcategories) {
    this.subcategories = this.subcategories.map((subcategory: string) => titlize(subcategory));
  }
  next()
})


export const Category = model("Categories", categorySchema)


