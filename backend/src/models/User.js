// src/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'counselor'] },
  major: { type: String },
  year: { type: String },
  livingSituation: { type: String },
  goals: { type: String },
  dob: { type: String },
  emergencyName: { type: String },
  emergencyRelation: { type: String },
  emergencyNumber: { type: String },
  supportNetwork: { type: String },
});

const User = mongoose.model('User', UserSchema);

export default User; // ✅ default export
