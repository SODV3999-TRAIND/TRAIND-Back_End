const express = require("express");
const router = express.Router();

var users =[ {
    email: 'abc@gmail.com' ,password: 'password'
}
]

router.get('/',function(req, res, next){
    res.send("Welcome to backend server");

});

router.post('/formm', function(req, res){
 let result = users.find(user => user.email == req.body.email);
 if(result) {
     if(result.password == req.body.password){
         res.status(200).send( {
             message: "Successful login!!"
         })
     }else {
         res.status(200).send( {
             message: "Password incorrect!!"
         })
     }
 }else {
     res.status(200).send( {
         message: "User not found"
     })
 }
})
const clientRoute = require("./client");
const eventRoute = require("./event");

router.use("/client", clientRoute);
router.use("/event", eventRoute);

module.exports = router;
