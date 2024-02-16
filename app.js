const express = require("express");
const app = express();
const dotenv = require("dotenv");
const web = require("./Routes/Web.");
const fileupload = require("express-fileupload");
dotenv.config({ path: "./.env" });
const connectdb = require("./db/dbcon");
const cookiepasrser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
connectdb();
app.use(express.json());
app.use(cookiepasrser());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));
app.use("/api", web);

// app.use(express.urlencoded({ extended: true }));

// server create
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server runing ${PORT}`);
});
