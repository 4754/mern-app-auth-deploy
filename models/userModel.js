// import mongoose from "mongoose";
// import bcrypt from 'bcryptjs';

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// hashing password before save to db
userSchema.pre('save', async function(next){

    // if password is not modified move on
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

// adding auth method to user schema.

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password, );

}

const User = mongoose.model("User", userSchema);
// export default User;

// exports.User = User;
module.exports = User;
