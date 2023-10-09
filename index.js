const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;
const bodyParser = require('body-parser');
const {dataTracking} = require("./models");
const {user} = require("./models");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"*"
}))

app.get("/tracking-shipping/:trackingNumber", async (req,res) => {
    try{
        const trackingNumber = req.params.trackingNumber
        const result = await dataTracking.findOne ({
            where: {
                 trackingNumber: trackingNumber
            }
        })
        if (result){
            return res.send({
                message: "Data berhasil ditampilkan",
                data: result
            }) 
        }
        return res.send({
            message: "Data tidak ditemukan"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Data gagal ditampilkan"
        });
    }
})

app.post("/input-data-tracking", async(req, res) => {
    try{
        const body = req.body
        const nama = body.nama
        const namaBarang = body.namaBarang
        const nomorHP = body.nomorHP
        const destination = body.destination
        const weight = body.weight
        const trackingNumber = new Date().getTime()
        await dataTracking.create({
            nama: nama,
            namaBarang: namaBarang,
            nomorHP: nomorHP,
            destination: destination,
            weight: weight,
            trackingNumber: trackingNumber
        })
       return res.send({
        message: "Data berhasil disimpan",
        status: 200,
        trackingNumber
       }) 
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Data gagal disimpan",
        });
    }
})

app.post("/register", async(req, res) => {
    try{
        const body = req.body
        const fullname = body.fullname
        const password = body.password
        const email = body.email
        if (!fullname || !password || !email) {
            return res.status(400).send({
                message: "All fields are required.",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        await user.create({
            fullname: fullname,
            password: hashedPassword,                    
            email: email
        });

    return res.send({
        message: "Your account has been created",
       }) 
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Failed to create account",
        });
    }
})

app.post("/login", async (req,res) => {
    const body = req.body;
    if (!body.email || !body.password) {
        return res.status(400).send({
            message: "Email and password are required fields.",
        });
    }

    try{
        const user = await user.findOne({
            where: {
                email: body.email,
            },
        });
        if (user) {
            const passwordMatch = await bcrypt.compare(body.password, user.password);
            if (passwordMatch) {
                return res.send({
                    message: "Success login",
                    data: user,
                });
            } else {
                return res.send({
                    message: "Invalid email or password",
                });
            }
        } 
        else {
            return res.send({
                message: "Invalid email or password",
            });
        }
    } 
    catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Failed to log in",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on localhost: ${PORT}`);
})