const express = require("express");
const router = express.Router();
const UC = require("../Controller/UserController");
const PC = require("../Controller/profileController");
const CC = require("../Controller/CategoryController");
const PRC = require("../Controller/ProductController");
const PaymentController = require("../Controller/PaymentController");
const checkuserauth = require("../Middleware/auth");

router.get("/getalluser", checkuserauth, UC.getalluser);
router.get("/getsingleuser", checkuserauth, UC.getsingleuser);
router.post("/userinsert", UC.userinsert);
router.post("/verifylogin", UC.verifylogin);
router.get("/logout", UC.logout);

router.post("/updatepass", checkuserauth, PC.updatepass);
router.post("/updateprofile", checkuserauth, PC.updateprofile);

router.post("/categoryinsert", CC.CategoryInsert);
router.get("/categorydisplay", CC.CategoryDisplay);
router.get("/categoryview/:id", CC.CategoryView);
router.post("/categoryupdate/:id", CC.CategoryUpdate);
router.post("/categorydelete/:id", CC.CategoryDelete);

router.post("/createproduct", PRC.CreateProduct);
router.get("/getallproduct", PRC.GetAllProduct);
router.get("/getproductdetail/:id", PRC.GetProductDetail);
router.post("/updateproduct/:id", PRC.UpdateProduct);
router.post("/deleteproduct/:id", PRC.DeleteProduct);

router.post(
  "/payment/process",
  checkuserauth,
  PaymentController.processPayment
);
router.get("/stripeapikey", checkuserauth, PaymentController.sendStripeApiKey);

module.exports = router;
