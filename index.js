const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

// Environment Variable
require('dotenv').config();


// Middle Ware --- 
app.use(cors())
app.use(express.json())

// user: photography
// pass: ij5OEqs5fZpK6RYl




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k8emzbd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const services = client.db("photography").collection("services")
        const reviews = client.db("photography").collection("reviews");
        app.get('/services', async(req, res) => {
            const query = {}
            const cursor = services.find(query);
            const data = await cursor.toArray();
            res.send(data);
        })

        app.get('/services/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id : ObjectId(id)}
            const service = await services.findOne(query);
            res.send(service);
        })

        app.post('/services', async(req, res) => {
            const service = req.body;
            const result = await services.insertOne(service);
            res.send(result);
            
        })


        // app.get('/reviews', async(req, res) => {
        //     let query = {};
        //     if(req.query.postId){
        //         query = {
        //             postId : req.query.postId
        //         }
        //     }
        //     const cursor = reviews.find(query)
        //     const servicesReviews = await cursor.toArray();
        //     res.send(servicesReviews);
        // })

        app.get('/reviews/:id', async(req, res) => {
            const id = req.params.id;
            const query = {postId: id};
            const cursor = reviews.find(query);
            const result = await cursor.toArray()
            res.send(result);
        })


        // Review 
        app.post('/reviews', async(req, res) => {
            const review = req.body;
            console.log(review);
            const result = await reviews.insertOne(review);
            res.send(result)
        })



        
    }
    catch{

    }
}


run().catch(err => console.log(err))





app.get('/', (req, res) => {
    res.send('Hello, I am Assignment 11 Server')
})

app.listen(port, () => {
    console.log(`Assignment 11 Server is Running By ${port}`)
})