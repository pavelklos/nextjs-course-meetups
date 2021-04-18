// [POST] /api/new-meetup

import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gmwjq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  // console.log(connectionString);

  const client = await MongoClient.connect(connectionString, {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client;
}

async function handler(req, res) {
  // console.log("req.method", req.method);
  // console.log("req.headers", req.headers);
  // console.log("req.body", req.body);

  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;

    // MongoDB : Database
    const client = await connectToDatabase();
    const db = client.db();
    const meetupsCollection = db.collection("meetups"); // collection = table
    const result = await meetupsCollection.insertOne(data); // one document = row
    console.log(result);
    client.close();

    return res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
