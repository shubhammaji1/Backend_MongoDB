const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const LoginSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    phone:{
        type : Number,
        required : true,
        unique: true
    },
    password:{
        type : String,
        required : true,
    },
    confirmPassword:{
        type : String,
        required : true,
    }

})

LoginSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        next();
        this.confirmPassword = undefined;
    }
    
    
})

const Register = new mongoose.model("Register",LoginSchema);
module.exports = Register;