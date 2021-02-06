const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bentoSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String },
    typeOfMeat: { type: String, require: true },
    quantity: { type: Number, require: true },
    price: { type: Number, require: true },
    img: {type: Buffer}
  },
  { timestamps: true }
);

bentoSchema.methods.toJSON = function () {
  const bento = this
  const bentoProfile = bento.toObject()

  return bentoProfile
}

const Bento = mongoose.model("Bento", bentoSchema)

module.exports = Bento
