const mongoose = require('mongoose');
const connection = ()=>{
   return mongoose.connect(process.env.live_url)
    .then(()=>{
        console.log("sucess database connect");
    }).catch((error)=>console.log(error));
}
module.exports = connection;