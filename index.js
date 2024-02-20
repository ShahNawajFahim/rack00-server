const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors());
app.use(express.json());

const port = 5000;

const uri = `mongodb+srv://quraish2:m0awuyIUBItEwqJk@cluster0.jkcvy5h.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const orderCollection = client.db('quraishrack').collection('order');

app.post('/order',  async (req, res) => {
    const order = req.body;
    console.log(order);
    const query = {
        customerName:order.customerName,
        customerAddress:order.customerAddress,
        cutomerPhone:order.customerPhone,
        selectedColor:order.selectedColor,
        productName:order.productName,
        subtotalPrice:order.subtotalPrice,
        shippingPrice:order.shippingPrice,
        totalPrice:order.totalPrice,

    }


    const result = await orderCollection.insertOne(order);
    res.send(result)
})

app.get('/orders', async (req, res) => {
    const query = {};
    const result = await orderCollection.find(query).toArray();
    res.send(result)
})

app.get('/orders/:id', async (req, res) => {
  const id = req.params.id;
  const query = {_id: ObjectId(id)};
  const orders_info = await orderCollection.find(query).toArray();
  res.send(orders_info)

});

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});