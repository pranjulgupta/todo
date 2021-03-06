const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const app=express();
var db;
var MongoClient = require('mongodb').MongoClient
, assert = require('assert'),
 ObjectID = require('mongodb').ObjectID
var url = 'mongodb://localhost:27017';
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);

db=client.db("todo");
})
app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))


app.post("/home",function(req,res)
{ let tasks=req.body;  
  
    db.collection('list1').insertOne(tasks, function(err, r) {
       res.json(r);
      
    })
    
})
app.post('/home1',function(req,res)
{
    db.collection('list1').find({}).toArray(function(err,result){
       res.json(result)
     })
})
app.post('/home2',function(req,res)
{let tasks1=req.body;
    db.collection('list1').deleteOne(tasks1, function(err, r) {
        res.json(r);
    })
})
app.post('/home3',function(req,res)
{let name=req.body.name;
    let priority=req.body.priority;
let id1=req.body.id;
console.log(id1);
    db.collection('list1').updateOne({'_id': ObjectID(id1)},{$set:{'name':name,'priority':priority}}, function(err, r) {
        res.json(r);
        })
})

app.post('/home4',function(req,res)
{let status1=req.body.status;
let id1=req.body.id;
    db.collection('list1').updateOne({'_id': ObjectID(id1)},{$set:{'status':status1}}, function(err, r) {
        res.json(r);
        })
})
app.listen(8080,function()
{

    console.log("server Start")
})

