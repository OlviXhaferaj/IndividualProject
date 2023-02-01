const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "User Name is required"]
    },
    email:{
        type:String,
        required: [true, "Email address is required"]
    },
    password:{
        type:String,
        required: [true, "The Password is required"],
        minlength: [8, "Password MUST be at least 8 characters"]
    }
    ,
    role:{
        type:String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
}, {timestamps:true});


//Virtual field
//store info from our request, but it wont be saved to the database
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value)


//middleware
UserSchema.pre("validate", function(next) {
    console.log('inside pre-Validate')
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match!");
    }
        // run the next step in the process
        next();
});

UserSchema.pre("save", function(next){
    //encrypt the password before it is saved to the database
    console.log('Inside pre-save')
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next();
        })
        .catch((err) => {
            console.log('Error while hashing the password');
        })
})



const User = mongoose.model("User", UserSchema);

module.exports = User;