const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator')

const orderSchema = new Schema({
    creator: {
      type: String,
      required: true,
      validate(value){
          if (!validator.isAlpha(value)) {
            throw new Error ('Your name must contain only letters')
          }
          if (!validator.isLength(value, 3)) {
            throw new Error ('Your name must contain at least 3 letters')
          }
      }
    },
    numberOfBentos: Number,
    bentos: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Bento'
    }],
    price: Number,
    deliver: Boolean,
    deliverAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address'
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
