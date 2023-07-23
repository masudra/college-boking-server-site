const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xyvppop.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const CampusCollection= client.db("campusConnect").collection("collegeCampus");
        const reviewCollection= client.db("campusConnect").collection("review");
        const imageGalleryCollection= client.db("campusConnect").collection("imagegallery");

    // get all data
    app.get('/collegeCampus',async(req,res)=>{
        const cursor = CampusCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })



    // ****************  review   **************************

     // ***** review Post add
    app.post('/review',async(req,res)=>{
      const addDatas = req.body;
      const result = await reviewCollection.insertOne(addDatas);
      res.send(result);
    })

    // get all data
    app.get('/review',async(req,res)=>{
        const cursor = reviewCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    // *********Image Gallery
    
    // get data for  imagegallery 
    app.get('/imagegallery',async(req,res)=>{
        const cursor = imageGalleryCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('hello world')

})
app.listen(port, () => {
    console.log(`port is running on${port}`)
})