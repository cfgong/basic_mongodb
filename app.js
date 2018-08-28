const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Activity = require('./models/activity');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('./models/user.js')
const bcrypt = require('bcrypt');

var router = express.Router();

app.use('/api', router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = require('bluebird');
// connect stats database to mongoose
mongoose.connect('mongodb://localhost:27017/stats', { useNewUrlParser: true });

// Authentication
passport.use(new BasicStrategy(
    function(username, password, done){
        User.findOne({ username: username }, function(err, user){
            console.log("Here is the user: ", user)
            if (user && bcrypt.compareSync(password, user.password)){
                return done(null, user);
            }
            return done(null, false);
        })
    }
))

// find the user Ethan
// var user = User.findOne({username: "Ethan"}, function(err, user){
//     user.password = 'test';
//     user.save(function(err){
//         if (err) {
//             return console.log('user not saved: '+ (err))
//         }
//         console.log("user saved!")
//     })
// })

app.get('/api/auth', passport.authenticate('basic', { session: false }), function(req, res){
    res.send(req.user.username + ' has been authenticated.');
})
// Authentication end

app.use(function(req, res, next){
    console.log('we use the router, and next moves to the next request');
    next();
})

app.get('/', function(req,res){
    res.json({message: 'You did it!'});
})

app.get('/api', function(req, res){
    console.log("get /api");
    res.json({message: "API Base ENDPOINT"});
})

app.listen(3000);
console.log('Starting application!');

// GET ./api/activities : show list of all activities & links
app.get('/api/activities', passport.authenticate('basic', { session: false }),
function(req, res){
    console.log('getting activities');
    Activity.find({}).then(eachOne =>{
        res.json(eachOne);
    })
})
// POST . /api/activities : create a new application to track
// activity_name
// quantity
app.post('/api/activities', passport.authenticate('basic', { session: false }),
function(req, res){
    Activity.create({
        activity_name: req.body.activity_name,
        quantity: req.body.quantity
    }).then(activity =>{
        res.json(activity)
    })
    console.log('Activity created!');
})

// specific routes to add, delete, update specific activities

// GET . /api/activities/{id} : show information about one activity
// get by activity_id
app.get('/api/activities/:activity_id', passport.authenticate('basic', { session: false }),
function(req, res){
    Activity.findById(req.params.activity_id).then(function(err, activity){
        if (err){
            console.log('Could not retrieve specific activity');
            res.send(err)
        }
        res.json(activity)
        console.log('Retrieved specific activity');
    })
})
// PUT . /api/activities/{id} : update by id
// activity_name
// quantity
app.put('/api/activities/:activity_id', passport.authenticate('basic', { session: false }),
function(req, res){
    Activity.findOneAndUpdate({
        activity_name: req.body.activity_name,
        quantity: req.body.quantity
    }).then(activity =>{
        res.json(activity)
    })
    console.log('updated activity');
})
// DELETE . /api/activities/{id} : delete by id
app.delete('/api/activities/:activity_id', passport.authenticate('basic', { session: false }),
function(req, res){
    Activity.findOneAndRemove({
        activity_name: req.body.activity_name,
        quantity: req.body.quantity
    }).then(activity =>{
        res.json(activity)
    })
    console.log('removed activity');
})
// POST . /api/activities/{id}/stats : post stats to a specific date

// DELETE . /api/stats/{id} :

// GET . /api/activities/date/:date : get items by date
// date
app.get('/api/activities/date/:date', passport.authenticate('basic', { session: false }),
function(req, res){
    Activity.find(req.params.date).then(function(err, activity){
        if (err){
            res.send(err)
        }
        res.json(activity)
    })
    console.log("Retrieved activity by date")
})

// PUT . /api/activities/addtodate/{activity_id}/{date} : update items by id and date
// quantity
app.put('/api/activities/addtodate/:activity_id/:date', passport.authenticate('basic', { session: false }),
function(req, res){
    Activity.findOneAndUpdate({
        quantity: req.body.quantity,
    }).then(activity => {
        res.json(activity)
    })
    console.log("updated activity by date")
})

// DELETE . /api/activities/addtodate/{activity_id}/{date} : delete items by id and date
app.delete('/api/activities/addtodate/:activity_id/:date', passport.authenticate('basic', { session: false }),
function(req, res){
    Activity.findOneAndRemove({
        activity_name: req.body.activity_name,
        quantity: req.body.quantity,
    }).then(activity => {
        res.json(activity)
    })
    console.log("removed activty")
})

