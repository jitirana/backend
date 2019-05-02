const express = require('express');
const app = express();
const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://zeigor:Pidpy2018,,minitodo@minitodo-y0izx.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("minitodo").collection("kanbanboard");
  console.log("Connected successfully to server!");
  // Insert a single document
  board = {name:'board',
          labels: [
            {
              name:'',
              color:'red',
              class:'label__color--watermellon',
            },
            {
              name:'',
              color:'blue',
              class:'label__color--sky',
            },
          ],
           lists: [
             {
               name: 'list 1'
             },
             {
              name: 'list 2'
            }

           ]};
  collection.insertOne(board, function(err, r) {

  });


  client.close();
});




app.get('/', (req, res) => res.send('minitodo!'));



app.listen(port, () => console.log(`minitodo listening on port ${port}!`));

