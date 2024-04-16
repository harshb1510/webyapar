import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
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
});

export default mongoose.model('Admin', AdminSchema);
