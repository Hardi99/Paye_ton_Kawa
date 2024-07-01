const Client = require('./Client');

exports.createClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).send({ message: 'Client créé' });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).send(clients);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).send({ message: 'Client non trouvé' });
        }
        res.status(200).send(client);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!client) {
            return res.status(404).send({ message: 'Client non trouvé' });
        }
        res.status(200).send(client);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).send({ message: 'Client non trouvé' });
        }
        res.status(200).send({ message: 'Client supprimé' });
    } catch (error) {
        res.status(400).send(error);
    }
};