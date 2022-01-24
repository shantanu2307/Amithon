const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./firebase.json');

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

initializeApp({
    credential: cert(serviceAccount)
});

app.use(cors());
app.use(express.json());

const db = getFirestore();

app.get('/', async (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})