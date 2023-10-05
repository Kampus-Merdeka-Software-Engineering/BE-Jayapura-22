const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const {dataTracking} = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        await dataTracking.create({
            nama: nama,
            namaBarang: namaBarang,
            nomorHP: nomorHP,
            destination: destination,
            weight: weight,
            trackingNumber: new Date() .getTime()
        })
       return res.send({
        message: "Data berhasil disimpan",
        status: 200,
       }) 
    } 
    catch (error) {
        return res.status(500).send({
            message: "Data gagal disimpan",
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on localhost: ${PORT}`);
})