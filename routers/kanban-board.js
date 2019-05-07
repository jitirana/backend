var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.json()); // for parsing application/jsonng


// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });


// Board List  routers
router.get('/kbboard/list', function (req, res) {
  console.log('get all board list');
  //database
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://zeigor:Pidpy2018,,minitodo@minitodo-y0izx.mongodb.net/test?retryWrites=true";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    if(!err){
      const db = client.db("minitodo");
      const collection = db.collection("kanbanboard");
      console.log("Connected successfully to server!");
      // get all list of the board
      collection.find().toArray(function(err, docs) {
        if(err) {
          res.json('error');
        } else {
          res.send(docs);
        }
      });
    } else {
      res.json('error in server');
    }
    client.close();
  });
    
});


router.post('/kbboard/list', function (req, res) {
  console.log('/kbboard/list');
  console.log('List Name:' + req.body.listName);
  
  //database
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://zeigor:Pidpy2018,,minitodo@minitodo-y0izx.mongodb.net/test?retryWrites=true";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  // connect to database
  client.connect(err => {
    if(!err){
      const db = client.db("minitodo");
      const collection = db.collection("kanbanboard");
    
      // create a list in the board
      collection.insertOne({name:req.body.listName}, function(err, r) {
        if(err){
          res.json({error:'error to create a new list'});
        } else{
          //return the created list
          res.send(r.ops);
        }
      });

    } else {
      res.json({error:'error to create a new list'});
    }
    client.close();
  });
});


module.exports = router;


// client.connect(err => {
//   const collection = client.db("minitodo").collection("kanbanboard");
//   console.log("Connected successfully to server!");
//   // Insert a single document
//   board = {name:'board',
//           labels: [
//             {
//               name:'',
//               color:'red',
//               class:'label__color--watermellon',
//             },
//             {
//               name:'',
//               color:'blue',
//               class:'label__color--sky',
//             },
//           ],
//            lists: [
//              {
//                name: 'list 1'
//              },
//              {
//               name: 'list 2'
//             }

//            ]};
//   collection.insertOne(board, function(err, r) {

//   });


//   client.close();
// });