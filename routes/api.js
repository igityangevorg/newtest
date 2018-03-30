const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req,res,next) => {
   res.render('index');
});

router.get('/get_all_users', (req,res,next)=>{
    User.find({},function (err,users) {
        if(err){
            res.send('Error');
        }
        if(!users){
            res.send('Users not found');
        }else{
            res.render('all_users', {users:users});
        }
    })
});
router.post('/create',  (req,res,next) => {
    User.create(req.body,function (err, saved) {
        if(err){
            res.json({success: false, message: err})
        }
        if(!saved){
            res.json({success: false, message: 'Err'});
        }else{
            res.send('User saved!');
        }
    });
});

router.put('/update',(req,res,next)=>{
   if(!req.body._id){
       res.send('No ID');
   }else{
       User.findById(req.body._id,function (err,user) {
           if(err){
               res.send(err);
           }
           if(!user){
               res.send('User not found');
           }else{
               user.firstName = req.body.firstName;
               user.lastName = req.body.lastName;
               user.birthday = req.body.birthday;
               user.address = req.body.address;
               user.address2 = req.body.address2;
               user.country = req.body.country;
               user.city = req.body.city;
               user.postalCode = req.body.postalCode;
               user.save((err)=>{
                   if(err){
                       res.send(err);
                   }else{
                       res.send('Updated!!!');
                   }
               })
           }
       })
   }
});

router.delete('/delete',(req,res,next)=>{
    if(!req.body._id){
        res.send('No ID');
    }else{
        User.findByIdAndRemove(req.body._id,function (err,removed) {
            if(err){
                res.send(err);
            }else{
                res.send('User Removed!!!');
            }
        })
    }
});

module.exports = router;
