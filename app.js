const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Activity = require('./models/activity');

var router = express.Router();

app.use('/api', router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = require('bluebird');
// connect stats database to mongoose
mongoose.connect('mongodb://localhost:27017/stats', { useNewUrlParser: true });

app.use(function(req, res, next){
    console.log('we use the router, and next moves to the next request');
    next();
})

app.get('/', function(req,res){
    res.json({message: 'You did it! Great job!'});
})

app.get('/api', function(req, res){
    console.log("get /api");
    res.json({message: "API Base ENDPOINT"});
})

app.listen(3000);
console.log('Starting application!');

// GET ./api/activities : show list of all activities & links
app.get('/api/activities', function(req, res){
    console.log('getting activities');
    Activity.find({}).then(eachOne =>{
        res.json(eachOne);
    })
})
// POST . /api/activities : create a new application to track
// activity_name
// quantity
app.post('/api/activities', function(req, res){
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
app.get('/api/activities/:activity_id', function(req, res){
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
app.put('/api/activities/:activity_id', function(req, res){
    Activity.findOneAndUpdate({
        activity_name: req.body.activity_name,
        quantity: req.body.quantity
    }).then(activity =>{
        res.json(activity)
    })
    console.log('updated activity');
})
// DELETE . /api/activities/{id} : delete by id
app.delete('/api/activities/:activity_id', function(req, res){
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
