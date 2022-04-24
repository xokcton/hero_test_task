const Hero = require('../models/schema.js')
const mongoose = require('mongoose')
const fs = require('fs')

const convertImgToBase64 = files => {
  const imgArray = files.map(file => {
    const img = fs.readFileSync(file.path)
    return img.toString("base64")
  })

  const imagesReadyToStore = imgArray.map((src, index) => ({
    filename: files[index].originalname,
    contentType: files[index].mimetype,
    imageBase64: src
  }))

  return imagesReadyToStore
}

const findAlreadyUploadedImgs = async (arr, id) => {
  try {
    const { images } = await Hero.findById(id)
    const uploadedImgs = []

    arr.forEach(first => {
      images.forEach(second => {
        if (first === second._id.toString()) uploadedImgs.push(second)
      })
    })
    return uploadedImgs
  } catch (error) {
    console.log(error.message)
    return []
  }
}

const addHero = async (req, res, next) => {
  const { files } = req
  const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body

  if (!files) {
    const error = new Error('Please choose some images!')
    error.httpStatusCode = 400
    return next(error)
  }

  const finalObject = {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images: convertImgToBase64(files)
  }

  try {
    const newHero = new Hero(finalObject)
    await newHero.save()
    return res.status(201).json({ message: 'Hero was successfully saved' })
  } catch (error) {
    console.log(error.message)
    return res.status(404).json({ message: 'Something went wrong!' })
  }
}

const fetchHeroes = async (req, res) => {
  try {
    const { limit, skip } = req.query
    const heroes = await Hero.find({}).skip(skip).limit(limit)
    if (heroes) {
      return res.status(200).json(heroes)
    } else {
      throw new Error('Can\'t fetch!')
    }
  } catch (error) {
    console.log(error.message)
    return res.status(404).json({ message: 'Something went wrong!' })
  }
}

const deleteHero = async (req, res) => {
  try {
    const id = req.params.id
    await Hero.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Hero has been removed!' })
  } catch (error) {
    console.log(error.message)
    return res.status(404).json({ message: 'Something went wrong!' })
  }
}

const getOneHero = async (req, res) => {
  try {
    const id = req.params.id
    const hero = await Hero.findById(id)
    if (hero) {
      return res.status(200).json(hero)
    } else {
      throw new Error('Can\'t fetch!')
    }
  } catch (error) {
    console.log(error.message)
    return res.status(404).json({ message: 'Something went wrong!' })
  }
}

const editHero = async (req, res, next) => {
  const { files } = req
  const id = req.params.id
  const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body
  let prevImgs = []

  if (req.body.prevImgs) {
    if (typeof req.body.prevImgs === 'string') {
      prevImgs.push(req.body.prevImgs)
    } else {
      req.body.prevImgs.forEach(element => {
        prevImgs.push(element)
      })
    }
  }

  if (!files) {
    const error = new Error('Please choose some images!')
    error.httpStatusCode = 400
    return next(error)
  }

  const alreadyUploaded = await findAlreadyUploadedImgs(prevImgs, id)

  const finalObject = {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images: [...convertImgToBase64(files), ...alreadyUploaded]
  }

  console.log(finalObject.nickname)
  console.log(finalObject.images)

  try {
    const response = await Hero.findByIdAndUpdate(id, finalObject)
    console.log(response)
    return res.status(200).json({ message: 'Hero information has been successfully updated.' })
  } catch (error) {
    console.log(error.message)
    return res.status(404).json({ message: 'Something went wrong!' })
  }
}

module.exports = { addHero, fetchHeroes, deleteHero, getOneHero, editHero }