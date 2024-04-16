import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  firstName: { type: String },
  photo:{type:String},
  userId:{
    type:String,
    required:true,
    unique:true
  }

});

export default mongoose.model('User', UserSchema);
