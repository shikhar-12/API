const jwt = require("jsonwebtoken");
const usermodel = require("../Models/user");

const checkuserauth = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    res.status(401).json({ status: "Failed", message: "Unauthorized User" });
  } else {
    const record = await jwt.verify(token, "pn@975");
    // console.log(record);
    const data = await usermodel.findOne({_id:record.ID});
    req.data1 = data;
    next();
  }
};
module.exports = checkuserauth;
