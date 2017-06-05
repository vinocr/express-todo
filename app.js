const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));

});

app.post('/add',function(req,res){
  if(req.body.todo){
    fs.readFile('./data.json','utf8',function(err,data){
    if(data.length!=0){
      var oldTodos = JSON.parse(data);
      oldTodos.push({
          todo:req.body.todo,
          createdAt:new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getYear()
        });
      var newTodo = JSON.stringify(oldTodos);
      fs.writeFile('./data.json',newTodo,'utf8');
    }else{
      var todoArray = [];
      todoArray.push({
        todo:req.body.todo,
        createdAt:new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getYear()
      });
      var todo = JSON.stringify(todoArray);
      fs.writeFile('./data.json',todo,'utf8');
    }
    });
  }

});

app.listen(3000,function(){
  console.log('server started');
});
