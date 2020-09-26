const { Router } = require("express");
const express = require("express");
const router = express.Router();

router.post("/confirmar",(req,res) =>{
    res.end("<h1>Sergio gay</h1>")
})

// router.use(express.static())
module.exports = router;