
const express = require("express")
const cors = require("cors")


var bodyParser = require('body-parser');




const app = express()
app.use(cors())



app.use(express.json());

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))




var corsOptions = {
    origin: 'http://localhost:3000' || "mehdirazanaqvi.github.io",
    optionsSuccessStatus: 200 
  }



const port = process.env.PORT || 4000



app.listen(port, () => {







    const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

    const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





    app.get('/', (req, res) => {
        res.send("Running")




    })




    app.get('/getpost', (req, res) => {

        client.connect(err => {

            //   const collection = client.db("database0").collection("col0");


            client.db("database0").collection("post").find({}).toArray()
                .then((ans) => res.send(ans))
                .catch((err) => console.log(err))



        })

    })




    app.post('/setpost', cors(corsOptions) ,(req, res) => {


        console.log(req.body)


        client.connect(err => {




            client.db("database0").collection("post").insertOne(req.body)
                .then((ans) => console.log("sent to database"))
                .catch((err) => console.log(err))



        })



    })






    app.post("/liked", (req, res) => {

        // console.log(req.body)





        client.db("database0").collection("post").updateOne({ _id: ObjectId(req.body._id) }, { $push: { likers: req.body.uid } })
            .then((r) => console.log("sucess"))

    })





    app.post("/delete", (req, res) => {

        client.connect(err => {




            client.db("database0").collection("post").deleteOne({ _id: ObjectId(req.body.id) })
                .then((ans) => console.log("Deleted succesfully"))
                .catch((err) => console.log(err))



        })


    })








})