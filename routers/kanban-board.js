var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const BoardList = require("../models/boardList");

router.use(bodyParser.json()); // for parsing application/jsonng

// Get all lists of the board
router.get("/kbboard/list", function(req, res) {
  console.log("get all board list");
  BoardList.find(null, "-_v")
    .sort({ position: 1 })
    .exec((err, docs) => {
      if (err) {
        res.statusCode = 500;
        res.send({ message: "Error to get the  lists" });
      } else {
        res.send(docs);
      }
    });
});

// Create a new list.
router.post("/kbboard/list", function(req, res) {
  // First a query to get the position of the list is made.
  // Once the position is known the new list is added with the positon field = lastPosition +1
  BoardList.find(null, "position -_id")
    .sort({ position: -1 })
    .limit(1)
    .exec((err, doc) => {
      if (err) {
        res.statusCode = 500;
        res.send({ message: "Error to create a new list" });
      }
      let position = doc.length > 0 ? doc[0].position + 1 : 0;
      let list = new BoardList({ name: req.body.listName, position: position });
      list
        .save()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.statusCode = 500;
          res.send({ message: "Error to create a new list" });
        });
    });
});

// Delete a list.
router.post("/kbboard/list/rm", (req, res) => {
  console.log(req.body.listId);
  BoardList.deleteOne({ _id: req.body.listId }, err => {
    if (err) {
      res.statusCode = 500;
      res.send({ error: "Erro to remove the list" });
    } else {
      // reorder the positions of all lists in database after removing a list
      BoardList.find()
        .sort({ position: 1 })
        .exec((err, docs) => {
          docs.forEach((doc, index) => {
            doc.position = index;
            doc.save();
          });
        });
      res.send(req.body.listId);
    }
  });
});

module.exports = router;
