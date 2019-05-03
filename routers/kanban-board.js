var express = require('express');
var router = express.Router();





// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/kanban/', function (req, res) {
  res.send('Kanban board home page');
});

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

router.get('/kbboard/list/i', function (req, res) {
  console.log('Creating a list...')
  //database
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://zeigor:Pidpy2018,,minitodo@minitodo-y0izx.mongodb.net/test?retryWrites=true";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  
  client.connect(err => {
    if(!err){
      const db = client.db("minitodo");
      const collection = db.collection("kanbanboard");
    
      // create a list in the board
      collection.insertOne({name:'listxxx'}, function(err, r) {
        if(err){
          console.log(err.name);
          console.log(err.code);
          console.log(err.errmsg);
          console.log(err.stack);
          res.send('Erro to create list!');
        } else{
          console.log(r.ops);
          console.log(r.insertedCount);
          console.log(r.insertedId);
          console.log(r.result.n);
          console.log(r.result.ok);
          res.send('List was created!')
        }
      });

    } else {
      res.json('Error to connect to database!');
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