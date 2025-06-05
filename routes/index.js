const router = require('express').Router();
const passport = require("passport");

const users = require('./users');
const groups = require('./groups');

router.use('/', require('./swagger'));
router.use('/users', users);
router.use('/groups', groups);

router.get('/login', passport.authenticate('github'), (req, res)=>{})

router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/');
    })
})

module.exports = router;