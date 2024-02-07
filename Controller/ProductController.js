const cloudinary = require("cloudinary").v2;
const ProductModel = require("../Models/Product");

cloudinary.config({
  cloud_name: "dgl0ugw9p",
  api_key: "233799267255433",
  api_secret: "JcgJ5SbrsgtWVCuQ2ne9ZRCjmUU",
});

class ProductController {
  static GetAllProduct = async (req, res) => {
    try {
      const result = await ProductModel.find();
      res
        .status(201)
        .json({ status: "success", message: "good", records: result });
    } catch (error) {
      console.log(error);
    }
  };
  // admin
  static CreateProduct = async (req, res) => {
    try {
      const {
        formName: nm,
        formDescription: ds,
        formPrice: prc,
        formCategory: ctr,
      } = req.body;
      const img = req.files.foo;

      const op = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "apiproject/Product",
      });
      const result = new ProductModel({
        name: nm,
        description: ds,
        price: prc,
        category: ctr,
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
  static GetProductDetail = async (req, res) => {
    try {
      const result = await ProductModel.findById(req.params.id);
      res
        .status(201)
        .json({ status: "success", message: "good", record: result });
    } catch (error) {
      console.log(error);
    }
  };
  static UpdateProduct = async (req, res) => {
    try {
      const {
        formName: nm,
        formDescription: ds,
        formPrice: prc,
        formCategory: ctr,
      } = req.body;
      const result = await ProductModel.findById(req.params.id);
      await cloudinary.uploader.destroy(result.image[0].public_id);
      // console.log(nm);
      const img = req.files.foo;
      const rimg = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "apiproject/Product",
      });
      // console.log(rimg);
      await ProductModel.findByIdAndUpdate(req.params.id, {
        name: nm,
        description: ds,
        price: prc,
        category: ctr,
        image: {
          public_id: rimg.public_id,
          url: rimg.secure_url,
        },
      });
      res.status(201).json({
        status: "success",
        message: "Update Success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  static DeleteProduct = async (req, res) => {
    try {
      const result = await ProductModel.findById(req.params.id);
      await cloudinary.uploader.destroy(result.image[0].public_id);
      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(201).json({ status: "success", message: "Delete Success" });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = ProductController;
