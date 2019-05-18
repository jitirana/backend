const express = require("express");
const app = express();
var mongoose = require("mongoose");
const port = 3000;

//routers
var rt_kanbanboard = require("./routers/kanban-board");

app.use(rt_kanbanboard);

app.get("/", (req, res) => res.send("minitodo!"));

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${
      process.env.DB_PASSWORD
    }@minitodo-y0izx.mongodb.net/${process.env.DB_NAME}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(port, () => console.log(`minitodo listening on port ${port}!`));
  })
  .catch(err => {
    console.log(err);
  });
