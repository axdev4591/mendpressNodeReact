const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

exports.login = (req, res, next) => {
   
    Admin.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length <= 0){
            return res.status(500).json({
                message: 'Something went wrong, no user admin found'
            });
        }else{
            // Load hash from your password DB.
            //const user = user[0];
            
         
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                
                if(err){
                    return res.status(500).json({
                        error: 'Login Failed'
                    });
                }else{
                    if(result){

                        // Create token
                        const payload = {
                            userId: user[0]._id,
                            iat:  Math.floor(Date.now() / 1000) - 30,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        }
                        jwt.sign(payload, 'mysecretkey', function(err, token) {
                            console.log(token)
                            if(err){
                                return res.status(200).json({
                                    error: 'err'
                                });
                            }else{
                                res.status(200).json({
                                    message: {
                                        user: {
                                            userId: user[0]._id,
                                            firstName: user[0].firstName,
                                            lastName: user[0].lastName,
                                            email: user[0].email
                                        },
                                        token: token
                                    }
                                });
                                
                            }
                            
                        });

                        
                    }else{
                        res.status(200).json({
                            message: 'Login Failed'
                        })
                    }
                }
                
                
            });
        }
    })
    .catch(er => {
        res.status(500).json({
            error: er
        });
    });

}

exports.signup1 = (req, res, next) => {

    Admin.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length > 0){
            return res.status(500).json({
                message: 'Already registered, try another email address'
            });
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                // Store hash in your password DB.
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        createdAt: new Date().toISOString()
                    });
                
                    admin.save()
                    .then(doc => {
                        res.status(201).json({
                            message: 'Admin Registered Successfully'
                        });
                    })
                    .catch(er => {
                        res.status(500).json({
                            error: er
                        });
                    });
                }
            });
        }
    })

    

}

exports.signup = async (req, res) => {
    try {
      const user = new User({
        name: 'admin',
        email: 'admin@example.com',
        password: '1234',
        isAdmin: true,
      });
      const newUser = await user.save();
      res.send(newUser);
    } catch (error) {
      res.send({ message: error.message });
    }
}