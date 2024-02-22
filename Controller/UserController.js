const usermodel = require("../Models/user");
const cloudinary = require("cloudinary").v2;
const fileupload = require("express-fileupload");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { json } = require('body-parser');

cloudinary.config({
  cloud_name: "dgl0ugw9p",
  api_key: "233799267255433",
  api_secret: "JcgJ5SbrsgtWVCuQ2ne9ZRCjmUU",
});

class UserController {
  static getalluser = async (req, res) => {
    try {
      const result = await usermodel.find();
      res
        .status(201)
        .json({ status: "success", message: "good", records: result });
      // res.send('hello api');
    } catch (error) {
      console.log(error);
    }
  };
  static getsingleuser = async (req, res) => {
    try {
      //const {name : nm , email : em , image : img} = req.data1;
      console.log(req.data1._id);
      const result = await usermodel.findById(req.data1._id);
      res
        .status(201)
        .json({ status: "success", message: "good", records: result });
      // res.send('hello api');
    } catch (error) {
      console.log(error);
    }
  };
  static userinsert = async (req, res) => {
    try {
      const { name: un, email: em, password: pw, cpassword: cpw } = req.body;
      const rty = await usermodel.findOne({ email: em });
      if (rty) {
        res
          .status(401)
          .json({ status: "failed", message: "email already taken" });
      } else {
        if (un && em && pw && cpw) {
          if (pw == cpw) {
            const hashpass = await bcrypt.hash(pw, 10);
            // console.log(hashpass);
            const img = req.files.foo;
            const op = await cloudinary.uploader.upload(img.tempFilePath, {
              folder: "apiproject",
            });
            // console.log(op);
            const result = new usermodel({
              name: un,
              email: em,
              password: hashpass,
              image: {
                public_id: op.public_id,
                url: op.secure_url,
              },
            });
            await result.save();
            res.status(201).json({ status: "success", message: "good" });
          } else {
            res
              .status(401)
              .json({ status: "failedd", message: "Password do not match" });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "Fill All Fields" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body);
      const { email: em, password: pw } = req.body;
      if (em && pw) {
        const record = await usermodel.findOne({ email: em });
        if (record) {
          const ismatched = await bcrypt.compare(pw, record.password);
          if (ismatched) {
            const token = jwt.sign({ ID: record._id }, "pn@975");
            // console.log(token);
            res.cookie("token", token);
            // console.log(tokena);
            res.status(201).json({
              status: "Success",
              message: "Logged in",
              records,
            });
          } else {
            res
              .status(401)
              .json({ status: "Failed", message: "Password Incorrect" });
          }
        } else {
          res
            .status(401)
            .json({ status: "Failed", message: "Record Do Not Exist" });
        }
      } else {
        res.status(401).json({ status: "Failed", message: "Fill all Fields" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  static logout = (req, res) => {
    try {
      res.clearCookie("token");
      res.status(201).json({ status: "Success", message: "Logged out" });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = UserController;
