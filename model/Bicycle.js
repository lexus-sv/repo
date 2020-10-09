const {Schema, model} = require("mongoose");

const schema = new Schema({
    bike_name: {type: String, unique: true},
    bike_type: {type: String},
    bike_price: {type: Number},
    rent: {type: Boolean},
    rent_hours: {type: Number, default: 1}
});

module.exports = model("Bicycle", schema);