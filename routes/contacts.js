// <contacts.js> //
//==dependencies==//
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


//==routing==//
router.get('/', (req, res) => {  //index
    Contact.find({}, (err, contacts) => {
        if(err) return res.json(err);
        res.render('contacts/index', {contacts:contacts});
    });
});
router.get('/new', (req, res) => {  //new
    res.render('contacts/new');
});
router.post('/', (req, res) => {  //create
    Contact.create(req.body, (err, contact) => {
        if(err) return res.json(err);
        res.redirect('/contacts');
    });
});
router.get('/:id', function(req, res){  //show
    Contact.findOne({_id:req.params.id}, function(err, contact){
      if(err) return res.json(err);
      res.render('contacts/show', {contact:contact});
    });
});
router.get('/:id/edit', function(req, res){  //edit
    Contact.findOne({_id:req.params.id}, function(err, contact){
      if(err) return res.json(err);
      res.render('contacts/edit', {contact:contact});
    });
});
router.put('/:id', function(req, res){  //update
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
      if(err) return res.json(err);
      res.redirect('/contacts/'+req.params.id);
    });
});
router.delete('/:id', function(req, res){  //destroy
    Contact.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/contacts');
    });
});

module.exports = router;