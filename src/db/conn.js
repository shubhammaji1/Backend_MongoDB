const mongoose = require("mongoose");
const URI = "mongodb+srv://Shubham:newPassword@restapi.sky6h.mongodb.net/RESTAPI?retryWrites=true&w=majority&appName=RESTAPI"

mongoose.connect(URI).then(()=>{
    console.log("Connected Successfully");
    
}).catch((e)=>{
    console.log("Not connected");
})