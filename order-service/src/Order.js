const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    coffees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coffee', required: true }],
    total: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;