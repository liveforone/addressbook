// <Contact.js> //
//==dependencies==//
const moongoose = require('mongoose');
const contactSchema = moongoose.Schema({
    name:{type:String, required:true, uniqe:true},
    email:{type:String},
    phone:{type:String}
});
const Contact = moongoose.model('contact', contactSchema);

module.exports = Contact;