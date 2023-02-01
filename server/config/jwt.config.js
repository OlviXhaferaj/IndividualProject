// create our own middleware 
//if a user is not logged in, then send a error response back
const User = require('../models/user.models')
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate(req, res, next) {
        jwt.verify(req.cookies.usertoken, 
            process.env.JWT_SECRET,
            // once we can compare the unhashed version of the cookie
            //, run this callback function
            (err, payload) => {
                if(err) {
                    //this is not a valid token or the cookie doesnt exist
                    res.status(401).json({message: 'Verified is false'});
                } else{
                    console.log(payload.user_id, 'USERRRRR id');
                    console.log(payload, 'this is the payload');
                    req.user=payload.role
                    console.log(req.user, 'this is the req.user')
                    // console.log(req.user, "REQQQ USE")
                    // err is null so it verified correctly
                    console.log('All good to proceed');
                    next();
                }
            }
        )
    } 
}

