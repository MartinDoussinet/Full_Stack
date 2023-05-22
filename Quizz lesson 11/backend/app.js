const express = require('express');
const Thing = require('./models/Thing');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MartinDoussinet:MartinDoussinet@cluster0.7licwmx.mongodb.net/?retryWrites=true&w=majority', 
    {useNewUrlParser: true, 
    useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/api/products', (req, res) => {
    Thing.find()
        .then(products => res.status(200).json({ products }))
        .catch(error => res.status(400).json({  error }));
});

app.get('/api/products/:id', (req, res) => {
    Thing.findOne({ _id: req.params.id })
        .then(product => res.status(200).json({ product }))
        .catch(error => res.status(404).json({ error }));
});

app.post('/api/products', (req, res) => {
    const product = new Thing({
        ...req.body
    });
    product.save()
        .then(product => res.status(201).json({ product }))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/products/:id', (req, res) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Modified!'}))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res) => {
    Thing.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Deleted!'}))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;