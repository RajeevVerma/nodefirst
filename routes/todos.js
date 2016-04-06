/* global Todo */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = require('../serverModules/Todo');
var security = require('../serverModules/security');
/* GET users listing. */
router.get('/', function(req, res, next) {
    if (security.isAuthenticated(req, res, next)){
        // use mongoose to get all todos in the database
        Todo.find().limit(10).exec(function(err, todos) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    }
});


// create todo and send back all todos after creation
router.post('/', function(req, res) {
    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// get a todo
router.get('/:todo_id', function(req, res) {
    Todo.find({
        _id: req.params.todo_id
    }, function(err, todo) {

        res.json(todo);
    });

});


module.exports = router;
