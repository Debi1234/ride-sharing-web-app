const express = require('express');
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware")
const {getCoordinates,getDistTime,getSuggestions}=require("../controllers/maps.controller")
const { validationResult,query } = require('express-validator')

router.get('/get-coordinates',query('address').isString().isLength({min:3}),authUser,getCoordinates)
router.get('/get-dist-time',query('origin').isString().isLength({min:3}),query('destination').isString().isLength({min:3}),authUser,getDistTime)
router.get('/get-suggestions',query('input').isString().isLength({min:3}),authUser,getSuggestions)



module.exports = router;