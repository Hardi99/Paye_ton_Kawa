const Coffee = require('./Coffee');

exports.createCoffee = async (req, res) => {
    try {
        const coffee = new Coffee(req.body);
        await coffee.save();
        res.status(201).send({ message: 'Café créé' });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getCoffees = async (req, res) => {
    try {
        const coffees = await Coffee.find();
        res.status(200).send(coffees);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getCoffee = async (req, res) => {
    try {
        const coffee = await Coffee.findById(req.params.id);
        if (!Coffee) {
            return res.status(404).send({ message: 'Café non trouvé' });
        }
        res.status(200).send(coffee);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateCoffee = async (req, res) => {
    try {
        const coffee = await Coffee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!coffee) {
            return res.status(404).send({ message: 'Café non trouvé' });
        }
        res.status(200).send(coffee);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteCoffee = async (req, res) => {
    try {
        const coffee = await Coffee.findByIdAndDelete(req.params.id);
        if (!coffee) {
            return res.status(404).send({ message: 'Café non trouvé' });
        }
        res.status(200).send({ message: 'Café supprimé' });
    } catch (error) {
        res.status(400).send(error);
    }
};