// <index.js> //
//==dependencies==//
const express = require('express');
const mongoose = require('mongoose');  //mongodb orm
const bodyParser = require('body-parser');
const methodOverrid = require('method-override');
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


//==routing==//
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));


//==server listen==//
app.listen(port, () => {
  console.log('server on! http://localhost:'+port);
});