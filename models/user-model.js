const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  gender: {type: String, enum: ['male', 'female']},
  age: {type: Number},
  isMarried: {type: Boolean, default: false},
  job: {type: String},
  hobby: {type: String},
  salary: {type: String, enum: ['+1000', '+3000', '+5000'] }
})

module.exports = model('User', UserSchema)