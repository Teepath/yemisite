var express = require('express');
var router = express.Router();
var nodemailer = require ('nodemailer');


router.get('/', function(req, res, next) {
  res.render('contact', {title: 'Contact'})
});

router.post('/send', (req, res, next)=>{
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'tunde4houseofgmyt@gmail.com',
        pass: '1234'
    }
});
  let mainOptions = {
    from: 'John Doe <johndoe@outlook,com>',
    to: 'tunde4houseofgmyt@gmail.com',
    subject: 'Website Submission',
    text: "You have a new submission with the following details...Name:" + req.body.name + 'Email:' + req.body.email + 'Message:' + req.body.message,
    html: '<p> You got a new submission with the following details </p><ul><li>Name: '+req.body.name+' </li><li>Email: '+ req.body.email +'</li><li>Message '+req.body.message +' </li>  </ul>' 
  };

  transporter.sendMail(mainOptions, (error, info)=>{
    if(error){
      console.log(error);
      res.redirect('/');     
    }else{
      console.log('message sent' + info.respose);
      res.redirect('/');
    }
  })
})

module.exports = router;