const express = require("express");
const path = require("path");
const router = express.Router();
require("./db/conn")
const hbs = require("hbs");
const app = express();
const Register = require("./models/registers");
const bcrypt = require("bcrypt");

const port = process.env.PORT || 3000;
// Host hbs file
const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("index")
})

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post("/register",async(req,res)=>{
    try {
       const password = req.body.password;
       const cpassword = req.body.confirmPassword;

       if(password === cpassword){
            const registerUser = new Register({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                phone: req.body.phone,
                password : password,
                confirmPassword : cpassword
            })

            const saveData = await registerUser.save();
            res.status(201).render("index");
       }else{
            res.send("Password Not Match");
       }
    } catch (error) {
        res.status(400).send(error);
        
    }
})

// Login 


app.post("/login",async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(`${email} and ${password} `);
        
        const userEmail =  await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password, userEmail.password)
        
        if(isMatch){
            res.status(201).render("index");
        }
        else{
            res.send("Invalid Details");
        }

        
    } catch (error) {
        res.status(400).send("Invalid Details")
    }
})


//Bcrypting

// const bcrypt = require("bcrypt");

// const securePassword = async(password)=>{
//    const passwordhash = await bcrypt.hash(password,10);
//     console.log(passwordhash);
//    const passowrdCompare = await bcrypt.compare(password,passwordhash);
//     console.log(passowrdCompare);
// }
// securePassword("shubham@123");


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
    
})