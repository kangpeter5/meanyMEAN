var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  _user: {type:Schema.ObjectId, ref:'User'},
  content: {type:String, required: true},
  desc: {type:String, required: true},
  answers: [{type:Schema.ObjectId, ref:'Answer'}]
})
mongoose.model("Question", QuestionSchema);