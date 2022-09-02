const router = require("express").Router();

router.get('/', (req, res) => {
    res.render('accessory/attach')
})

router.post('/create', (req, res) => {
    res.render('accessory/create')
})
router.get('/create', (req, res) => {
    res.render('accessory/create')
})

module.exports = router