const mongoose = require('mongoose')
const CartItem = require('../models/cartItem')

exports.addToCart = (req, res, next) => {

    console.log("add to cart############ "+JSON.stringify(req.body))
    console.log("add to cart############ "+JSON.stringify(req.body.user))
    CartItem.findOne({user: req.body.user})
    .exec()
    .then(cartItem => {

        if(cartItem){

            const item = cartItem.cart.find(item => item.product == req.body.product);
            let where, action, set;
            if(item){
                action = "$set";
                where = { "user": req.body.user, "cart.product": req.body.product};
                set = "cart.$";
            }else{
                action = "$push";
                where = { "user": req.body.user };
                set = "cart"
            }

            CartItem.findOneAndUpdate(where, {
                [action] : {
                    [set] : {
                        _id: item ? item._id : new mongoose.Types.ObjectId(),
                        product: req.body.product,
                        quantity: item ? (item.quantity + req.body.quantity) : req.body.quantity,
                        price: req.body.price,
                        total: item ? req.body.price * (req.body.quantity + item.quantity) : (req.body.price * req.body.quantity)
                    }
                }
            })
            .exec()
            .then(newItem => {
                res.status(201).json({
                    message: newItem
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: error
                });
            });

            

        }else{
            console.log("get ############ "+JSON.stringify(req.body.user))
            const newCartItem = new CartItem({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.user,
                cart: [
                    {
                        _id: new mongoose.Types.ObjectId(),
                        product: req.body.product,
                        quantity: req.body.quantity,
                        price: req.body.price,
                        total: req.body.quantity * req.body.price
                    }
                ]
            });

            newCartItem
            .save()
            .then(newCart => {
                res.status(201).json({
                    message: newCart
                });
            })
            .catch(error => {
                res.status(500).json({
                    error : error
                });
            });

        }

    })
    .catch(error => {
        res.status(500).json({
            error : error
        });
    });    

}

exports.getUserCartItems =  (req, res, next) => {

    const userId = req.params.userId
    console.log("get cart items: "+ userId)

    CartItem.find({user: userId})
    .select('_id user cart')
    .populate('cart.product', 'name imageUrl')
    .exec()
    .then(cartItems => {
        console.log("get cart items: "+cartItems)
        res.status(200).json({
            message: cartItems 
        })
        
    }).catch(err => {
        console.log("ann error occured: "+err)
    })
}

exports.QtyUpdate = (req, res, next) => {

    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const total = req.body.total;

    CartItem.updateOne({"user": userId, "cart.product": productId}, {
        $set : {
            "cart.$.quantity": quantity,
            "cart.$.total": total
        }
    })
    .exec()
    .then(cartItem => {
        res.status(201).json({
            message: cartItem
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });

}