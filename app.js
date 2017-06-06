const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();
//To get form data bodyParser is required
app.use(bodyParser.urlencoded({extended:true}));

// when u run localhost:8080 it will display index.html
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

// when u run localhost:8080/display it will display all todos
app.get('/display',function(req,res){
  res.sendFile(path.join(__dirname+'/display.html'));
});

//this route sends the json data for ajax request
app.get('/data',function(req,res){
  fs.readFile('./data.json','utf8',function(err,data){
    res.json(data);
  });
});

//when the form is submitted it will get execute
app.post('/add',function(req,res){
  //checking if the user has entered the data
  if(req.body.todo){
    fs.readFile('./data.json','utf8',function(err,data){
    //if already data present in data.json file,push the new todo into the existing one and write
    if(data.length!=0){
      var oldTodos = JSON.parse(data);
      oldTodos.push({
          todo:req.body.todo,
          createdAt:new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getYear()
        });
      var newTodo = JSON.stringify(oldTodos);
      fs.writeFile('./data.json',newTodo,'utf8');
    }else{
      //if no data present in data.json,create a new array,push the todo and write in data.json
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
