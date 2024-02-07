const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

const CategoryModel = mongoose.model("Categories", CategorySchema);
module.exports = CategoryModel;
