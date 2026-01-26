const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  role:{
    type:String
  },
  password: {
    type:String,
    required:[true,"Password is required"],
    minLength:[6,"Password must be at least 6 characters"],
    select:false
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  verificationCode:String 
});


userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();


  this.password = await bcrypt.hash(this.password, 12);
  next();
});


userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Generate and persist a verification code for the current user
userSchema.methods.createVerificationCode = function () {
  const code = crypto.randomBytes(12).toString("hex");
  this.verificationCode = code;
  return code;
};

const User = mongoose.model("User", userSchema); 
module.exports = User;