var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const BoardList = require("../models/boardList");

router.use(bodyParser.json()); // for parsing application/jsonng

// Board List  routers
router.get("/kbboard/list", function(req, res) {
  console.log("get all board list");
  //database
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://zeigor:Pidpy2018,,minitodo@minitodo-y0izx.mongodb.net/test?retryWrites=true";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    if (!err) {
      const db = client.db("minitodo");
      const collection = db.collection("kanbanboard");
      console.log("Connected successfully to server!");
      // get all list of the board
      collection.find().toArray(function(err, docs) {
        if (err) {
          res.json("error");
        } else {
          res.send(docs);
        }
      });
    } else {
      res.json("error in server");
    }
    client.close();
  });
});

router.post("/kbboard/list", function(req, res) {
  BoardList.find(null, "position -_id")
    .sort({ position: -1 })
    .limit(1)
    .exec((err, doc) => {
      if (err) {
        res.statusCode = 500;
        res.send({ message: "Error to create a new list" });
      }
      console.log("position:" + doc);
      let position = doc.length > 0 ? doc[0].position + 1 : 0;
      let list = new BoardList({ name: req.body.listName, position: position });
      list
        .save()
        .then(result => {
          console.log("mongosoe result " + result);
          res.send(result);
        })
        .catch(err => {
          console.log("mongoose err: " + err);
          res.statusCode = 500;
          res.send({ message: "Error to create a new list" });
        });
    });

  //database
  // const MongoClient = require("mongodb").MongoClient;
  // const uri =
  //   "mongodb+srv://zeigor:Pidpy2018,,minitodo@minitodo-y0izx.mongodb.net/test?retryWrites=true";
  // const client = new MongoClient(uri, { useNewUrlParser: true });
  // connect to database
  // client.connect(err => {
  //   if (!err) {
  //     const db = client.db("minitodo");
  //     const collection = db.collection("kanbanboard");

  //     collection
  //       .find()
  //       .sort({ position: -1 })
  //       .limit(1)
  //       .toArray(function(err, doc) {
  //         if (err) {
  //           client.close();
  //           res.statusCode = 500;
  //           res.json({ error: "error to find position column" });
  //         } else {
  //           console.log(doc);
  //           let position = 0;
  //           if (doc.length > 0) position = doc[0].position + 1;
  //           // create a list in the board
  //           collection.insertOne(
  //             { name: req.body.listName, position: position },
  //             function(err, r) {
  //               if (err) {
  //                 client.close();
  //                 console.log(doc[0].position);
  //                 console.log(err);
  //                 res.statusCode = 500;
  //                 res.json({ error: "error to create a new list" });
  //               } else {
  //                 res.json(r.ops[0]);
  //                 client.close();
  //               }
  //             }
  //           );
  //         }
  //       });
  //   } else {
  //     res.statusCode = 500;
  //     res.json({ error: "error connect to database" });
  //   }
  // });
});

module.exports = router;
