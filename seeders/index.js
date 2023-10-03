const express = require('express')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const {DataBarang} = require("./models");

app.use(bodParser.urlencoded({ extend: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("./cek-shipping/:tracking_number", async (req, res) => {
    try{
        const trackingNumber = req.params.tracking_number
        const result = await DataBarang.findOne({
            where : {
                tracking_number: trackingNumber
            },
        });
        if(result){
            return res.send({
                message: "Data berhasil ditampilkan",
                data: result
            })
        }
        return res.send({
            message: "Data barang tidak ditemukan",
        })

    } catch (error) {
        return res.status(500).send({
            message: "Data gagal ditampilkan",
        });
    }
})
app.post("/input-data-barang", async (req, res) => {
    try {
        const body = req.body
        const nama = body.nama
        const namaBarang = body.namaBarang
        const nomorHP = body.nomorHP
        const destination = body.destination
        const weight = body.weight
        await DataBarang.create({
            nama: nama,
            namaBarang: namaBarang,
            nomorHP: nomorHP,
            destination: destination,
            weight: weight,
            tracking_number: new Date().getTime(),
        })

        return res.send({
            message: "Data berhasil ditambah",
            status: 200,
        })

    } catch (error) {
        return res.status(500).send({
            message: "Data gagal disimpan",
        });
    }
})

app.listen(PORT, () => {
    console.log('Server running on locallhost:${PORT}');
})
