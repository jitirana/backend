const express = require('express');
const app = express();
const port = 3000;

//routers
var rt_kanbanboard = require('./routers/kanban-board');

app.use(rt_kanbanboard);

app.get('/', (req, res) => res.send('minitodo!'));



app.listen(port, () => console.log(`minitodo listening on port ${port}!`));

