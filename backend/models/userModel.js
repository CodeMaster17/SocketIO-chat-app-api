const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, },
   pic: { type: String, required: true }, //to give default value of the picture add the attribute default , syntax : {{default : {{picture link}}}}
},
   {
      timestamps: true,
   });

const User = mongoose.model("User", userSchema);
module.exports = User;
