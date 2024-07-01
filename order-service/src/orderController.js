const Order = require('./Order');

exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send({ message: 'Café créé' });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({ message: 'Café non trouvé' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).send({ message: 'Café non trouvé' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).send({ message: 'Café non trouvé' });
        }
        res.status(200).send({ message: 'Café supprimé' });
    } catch (error) {
        res.status(400).send(error);
    }
};