var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('client'));
app.use(bodyParser.json());


// models/db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/meanyMEAN_db');

var UserSchema = new Schema({
  name: String,
  questions: [{type:Schema.ObjectId, ref:'Question'}],
  answers: [{type:Schema.ObjectId, ref:'Answer'}]
})
mongoose.model("User", UserSchema);
var User = mongoose.model('User');

var QuestionSchema = new Schema({
  _user: {type:Schema.ObjectId, ref:'User'},
  content: {type:String, required: true},
  desc: {type:String, required: true},
  answers: [{type:Schema.ObjectId, ref:'Answer'}]
})
mongoose.model("Question", QuestionSchema);
var Question = mongoose.model('Question');

var AnswerSchema = new Schema({
  _user: {type:Schema.ObjectId, ref:'User'},
  _question: {type:Schema.ObjectId, ref:'Question'},
  content: {type:String, required: true},
  desc: {type:String, required: true}
})
mongoose.model("Answer", AnswerSchema);
var Answer = mongoose.model('Answer');

// require('./server/config/mongoose.js');
// require('./server/config/routes.js')(app);


//routes
app.post('/login', function(req, res){
  console.log("went to /login", req.body);
  //this function has to check if the user exists
  //and if it doesn't it will create the user
  //and send a user back either way.
  User.findOne({name: req.body.name}, function(err, user){
    if(err){ 
      console.log(err);
    }
    else{
      //is there a user?
      if(user){
        res.json(user);
      } 
      else{
        //otherwise make a user:
        User.create({name: req.body.name}, function(err, newUser){
          if(err) { console.log(err); }
          res.json(newUser);
        })
      }
    }
  })
})

//create question
app.post('/addQuestion', function(req, res){
  console.log('__server side addQuestion controller__', req.body);

  var newQuestion = new Question({
    _user: req.body.userId,
    content: req.body.content,
    desc: req.body.desc
  });
  newQuestion.save(function(err){
    if(err){
      console.log("__failed to add question to db___", err);
    }else{
      console.log('successfully added question to db!', newQuestion);
      User.findOneAndUpdate({_id:req.body.userId}, {$push:{"questions":newQuestion._id}}).exec(function(err, user){
        res.json();
      });
    }
  })
})

//create answer
app.post('/addAnswer', function(req,res){
    var answer = {
    _user: req.body.userId,
    content: req.body.content,
    desc: req.body.content,
    _question: req.body.questionId
  }
  Answer.create(answer, function (err, newAnswer){
    Question.findOneAndUpdate({_id:answer._question}, {$push:{"answers":newAnswer._id}}).exec(function(err, question){
      User.findOneAndUpdate({_id:answer._user}, {$push:{"answers":newAnswer._id}}).exec(function(err, user){
        res.json(200);
      })
    })
  })
})

// find answers to question/:id page
app.get('/question/:id',function(req,res){
  console.log("__ we in server/routes trying to get question ID___", req.params.id);
    Answer.find({}).populate("_user answers answers._user").exec(function(err, answers){
      if(err){
        console.log("__ had issue with question/:id server side and couldn't populate", err);
      }else{
        console.log('successfully populated the question/:id with answers');
        res.json(answers);
      }
    });
})

//populate questions and answers
app.get('/success', function(req,res){
  Question.find({}).populate('_user answers answers._user').exec(function(err, questions){
    var options = {
      path: 'answers._user',
      model: 'User'
    };
    Question.populate(questions, options, function(err,allQuestions){
      if(err){
        console.log(err);
      }else{
        console.log('successfully populated questions');
        res.json(allQuestions);
      }
    });
  });
})

//listen
app.listen(8000, function(){
  console.log("good stuff on port 8000");
})