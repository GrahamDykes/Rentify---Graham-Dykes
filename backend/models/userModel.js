const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first:{
    type: String,
    required: true,
  },
  last:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type:Number,
    required:true,
  },
  password: {
    type: String,
    required: true,
  },
  seller: {
    type:Boolean,
    required:true,
    default: false,
  }
});

//static signup method - cannot use arrow function due to THIS keyword being used
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password || !first || !last || !phone) {
    console.log("Error: User input field missing");
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    console.log("Error: Email not valid");
    throw Error("Email not valid");
  }
  
  //gotta use THIS when working with the collection at this level
  const exists = await this.findOne({ email });
  if (exists) {
    console.log("Error: Email in use");
    throw Error("Email already in use");
  }

  if (!validator.isStrongPassword(password)) {
    console.log("Error: Password not strong enough");
    throw Error("Password not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  console.log(`User created: ${user._id}`);
  return user;
};

//static login method
userSchema.statics.login = async function(email,password){
    if (!email || !password) {
        console.log("Error: User input field missing");
        throw Error("All fields must be filled");
      }

      const user = await this.findOne({ email });

      if (!user) {
        console.log("Error: No Email Found");
        throw Error("Incorrect Email");
      }
    
      const match = await bcrypt.compare(password,user.password)

      if(!match){
        console.log("Error: Bad Pass");
        throw Error("Incorrect Password");
      }

      return user
}




module.exports = mongoose.model("User", userSchema);
