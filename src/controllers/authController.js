const router = require('express').Router()

router.get("/register", (req, res) => {
    res.render("auth/register")
})

router.post("/register", (req, res) => {
    console.log(req.body);


    res.redirect("/auth/register")
})

router.get("/login", (req, res) => {
    res.render("auth/login")
})
module.exports = router