const express = require("express");
const router = new express.Router();
const Bento = require("../models/bento");
const multer = require('multer')
const upload = multer({
    limits: {fileSize: 1000000},
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image', undefined))
        }
        cb(undefined, true)
    }
})
const sharp = require('sharp')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


router.get('/bentos',async (req, res) => {
    try {
        const match = {}
        const sort = {}
        if (req.query.meat) {
            match.typeOfMeat = req.query.meat
        }
        if (req.query.sortBy) {
            const part = req.query.sortBy.split(':')
            sort[part[0]] = part[1] === 'desc' ? -1 : 1
        }
        const bentos = await Bento.find(match)
        res.send(bentos)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/bento/:id', async (req, res) => {
    try {
        const bento = await Bento.findOne({ _id: req.params.id })
        if (!bento) {
            res.send(401).send()
        }
        res.status(200).send(bento)
    } catch (error) {
        res.status(500).send(error)
    }
});
router.post('/bento',auth, admin , async (req, res) => {
    var newBento = new Bento(req.body)
    try {
        await newBento.save()
        res.status(200).send(newBento)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.patch('/bento/:id/update',auth, admin , async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'typeOfMeat', 'price', 'quantity']
    const isValidUpdate = updates.every((update) => {
        return allowedUpdate.includes(update)
    })
    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid Updates'})
    }

    try {
        const bento = await Bento.findOneAndUpdate({_id: req.params.id}, req.body, { new : true, runValidators: true })
        if (!bento){
            return res.status(404).send()
        }
        res.send(bento)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.delete('/bento/:id/delete',auth, admin ,  async (req, res) => {
    try {
        const bento = await Bento.remove({ _id: req.params.id })
        if (!bento) {
            res.status(404).send()
        }
        res.send(bento)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/bento/:id/upload-img',auth, admin , upload.single('file'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:200, height:200}).png().toBuffer()
    const bento = await Bento.findOne({ _id: req.params.id })
    if (!bento) {
        res.send(401).send()
    }
    bento.img = buffer
    await bento.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/bento/:id/remove-img',auth, admin , async (req, res) => {
    const bento = await Bento.findOne({ _id: req.params.id })
    if (!bento) {
        res.send(401).send()
    }
    bento.img = undefined
    await bento.save()
    res.send()
})

module.exports = router;
