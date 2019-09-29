const express = require('express');

var bodyParser=require('body-parser');

const app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({
extended: true
})); 
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Calculator Application</h1>');
});

app.get('/:data',(req,res)=>
{
  console.log("Call to Backend Server with input "+decodeURI(req.params.data)+" = "+ eval(req.params.data));
res.json(eval(req.params.data));

});



const port = 5000;

app.listen(port, () => `Server listening on port ${port}`);