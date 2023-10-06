const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;
const bodyParser = require('body-parser');
const {user} = require("./models/user");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"*"
}))

app.post("/register", async(req, res) => {
    try{
        const body = req.body
        const fullname = body.fullname
        const password = body.password
        const email = body.email
        await user.create({
            fullname: fullname,
            password: password,
            email: email
        })
    return res.send({
        message: "Your account has been created",
       }) 
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Failed to create account",
        });
    }
})

app.post("/login", async (req,res) => {
    const body = req.body;
    if(body.email == "" || body.password == ""){
        return res.send({
            message: "Empty filed"});
    }

    try{
        const result = await user.findOne ({
            where: {
                 email: body.email,
                 password: body.password
            }
        })
        if (result){
            return res.send({
                message: "Succcess login",
                data: result
            });
        }else {
            return res.send({
                message: "Invalid email or password"
                });
        }
    }catch (error) {
            console.log(error)
            return res.status(500).send({
                message: "Data gagal disimpan",
            });
        }
    })
app.listen(PORT, () => {
    console.log(`Server running on localhost: ${PORT}`);
})