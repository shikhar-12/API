const cloudinary = require("cloudinary").v2;
const CategoryModel = require("../Models/Category");
const ProductModel = require("../Models/Product");

cloudinary.config({
  cloud_name: "dgl0ugw9p",
  api_key: "233799267255433",
  api_secret: "JcgJ5SbrsgtWVCuQ2ne9ZRCjmUU",
});

class CategoryController {
  static CategoryInsert = async (req, res) => {
    try {
      const { ccnn: cname } = req.body;
      const img = req.files.foo;
      const op = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "apiproject/Category",
      });
      const result = new CategoryModel({
        CategoryName: cname,
        image: {
          public_id: op.public_id,
          url: op.secure_url,
        },
      });
      await result.save();
      res.status(201).json({ status: "success", message: "good" });
    } catch (error) {
      console.log(error);
    }
  };
  static CategoryDisplay = async (req, res) => {
    try {
      const result = await CategoryModel.find();
      res
        .status(201)
        .json({ status: "success", message: "good", records: result });
      // .status(201)
      // .json({ status: "success", message: "good", result });
    } catch (error) {
      console.log(error);
    }
  };
  static CategoryView = async (req, res) => {
    try {
      // console.log(req.params.id);
      const result = await CategoryModel.findById(req.params.id);
      res
        .status(201)
        .json({ status: "success", message: "good", record: result });
      // console.log("first");
    } catch (error) {
      console.log(error);
    }
  };
  static CategoryUpdate = async (req, res) => {
    try {
      const result = await CategoryModel.findById(req.params.id);
      const { CategoryName: cnm } = req.body;
      if (!req.files) {
        await CategoryModel.findByIdAndUpdate(req.params.id, {
          CategoryName: cnm,
        });
        res
          .status(201)
          .json({ status: "success", message: "only Category Name Updated" });
      } else {
        const img = req.files.foo;
        await cloudinary.uploader.destroy(result.image.public_id);
        const rimg = await cloudinary.uploader.upload(img.tempFilePath, {
          folder: "apiproject/Category",
        });
        await CategoryModel.findByIdAndUpdate(req.params.id, {
          CategoryName: cnm,
          image: {
            public_id: rimg.public_id,
            url: rimg.secure_url,
          },
        });
        res.status(201).json({
          status: "success",
          message: "CategoryName and Image Success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  static CategoryDelete = async (req, res) => {
    try {
      const result = await CategoryModel.findById(req.params.id);
      await CategoryModel.findByIdAndDelete(req.params.id);
      await cloudinary.uploader.destroy(result.image.public_id);
      res.status(201).json({ status: "success", message: "Delete Success" });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = CategoryController;
