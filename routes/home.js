// <home.js> //
//==dependencies==//
const express = require('express');
const router = express.Router();


//==Home routing==//
router.get('/', (req, res) => {
    res.redirect('/contacts');
});

module.exports = router;