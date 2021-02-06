const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    line1: { 
        type: String, 
        require: true 
    },
    line2: {
        type: String
    },
    city: {
        type: String,
        required:true
    },
    province: {
        type: String,
        require: true
    },
    country: {
        type: String,
        required:true
    },
    zipcode: {
        type: Number,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
  },
  { timestamps: true }
);

addressSchema.virtual('addressDelivered', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'deliverAddress'
  })

const Address = mongoose.model("Address", addressSchema)

module.exports = Address
