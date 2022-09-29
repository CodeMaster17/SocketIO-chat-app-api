const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, },
   pic: { type: String, required: false }, //to give default value of the picture add the attribute default , syntax : {{default : {{picture link}}}}
},
   {
      timestamps: true,
   });


// logic for matching password
userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
}

// logic to add encryption to the password before saving it to database
userSchema.pre('save', async function (next) {
   if (!this.isModified) {
      next()
   }

   const salt = await bcrypt.genSalt(10) //bcrypt dependency is downloaded
   this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema);

module.exports = User;
