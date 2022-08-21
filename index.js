const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j1x00uq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const shipmentCollection = client.db('ecommerce').collection('shipment');
        app.post('/shipment', async(req, res) => {
            const shipment = req.body;
            const result = await shipmentCollection.insertOne(shipment);
            console.log(result);
            res.json(result);
})
 
    }
    finally{}
}
run().catch(console.dir)


app.get('/', (req, res) =>{
    res.send('Ecommerce is running')
});

app.listen(port, () =>{
    console.log('Ecommerce is running on  port', port);
})
