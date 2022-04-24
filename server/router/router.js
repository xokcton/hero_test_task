const router = require('express').Router()
const { addHero, fetchHeroes, deleteHero, getOneHero, editHero } = require('../controllers/controller.js')
const store = require('../middleware/multer.js')

router.post('/addHero', store.array('images'), addHero)
router.get('/getHeroes', fetchHeroes)
router.delete('/deleteHero/:id', deleteHero)
router.get('/getOneHero/:id', getOneHero)
router.put('/editHero/:id', store.array('images'), editHero)

module.exports = router