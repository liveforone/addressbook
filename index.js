// <index.js> //
//==dependencies==//
const express = require('express');
const mongoose = require('mongoose');  //mongodb orm
const bodyParser = require('body-parser');
const methodOverrid = require('method-override');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 3000;


//==DB setting==//
/*
process.env 오브젝트는 환경변수들을 가지고 있는 객체
이 객체로 MONGO_DB 환경변수를 불러옴
*/
mongoose.connect(process.env.MONGO_DB);  
const db = mongoose.connection;
db.once('open', () => {
  console.log('DB connected');
});
db.on('error', (err) => {
  console.log('DB ERROR : ', err);
});


//==setting==//
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverrid('_method'));  //_method의 query로 들어오는 값으로 HTTP method를 바꿈


//==DB schema==//
const contactSchema = mongoose.Schema({
    name : {type:String, required:true, unique:true},
    email : {type:String},
    phone : {type:String}
});  //스키마 설정
const Contact = mongoose.model('contact', contactSchema);
//contact schema의 model을 생성


//==routing==//
app.get('/', (req, res) => {  //Home//
    res.redirect('/contacts');
});
app.get('/contacts', (req, res) => {  //index//
    Contact.find({}, (err, contacts) => {
        if(err) return res.json(err);
        res.render('contacts/index', {contacts:contacts});
    });
});
app.get('/contacts/new', (req, res) => {  //new//
    res.render('contacts/new');
});
app.post('/contacts', (req, res) => {  //create
    Contact.create(req.body, (err, contact) => {
        if(err) return res.json(err);
        res.redirect('/contacts');
    });
})
app.get('/contacts/:id', (req, res) => {  //show
    Contact.findOne({_id:req.params.id}, (err, contact) => {
        if(err) return res.json(err);
        res.render('contacts/show', {contact:contact});
    });
});
app.get('/contacts/:id/edit', (req, res) => {  //edit
    Contact.findOne({_id:req.params.id}, (err, contact) => {
        if(err) return res.json(err);
        res.render('contacts/edit', {contact:contact});
    });
});
app.put('/contacts/:id', (req, res) => {  //update
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, (err, contact) => {
        if(err) return res.json(err);
        res.redirect('/contacts/' + req.params.id);
    });
});
app.delete('/contacts/:id', (req, res) => {
    Contact.deleteOne({_id:req.params.id}, (err) => {
        if(err) return res.json(err);
        res.redirect('/contacts');
    });
});

app.listen(port, () => {
  console.log('server on! http://localhost:'+port);
});