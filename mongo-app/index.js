const { MongoClient } = require("mongodb"); // import
const uri = "mongodb://localhost:27017"; // uri to your local mongodb instance
const client = new MongoClient(uri); // instantiate a client with the uri

(async () => {
  await client.connect(); // connect to mongodb

  const db = client.db("sample_supplies"); // point to sample_restaurants database
  const collection = db.collection("sales"); // point to restaurants collection

  // Business Requirement 1
  let result = await collection
    .aggregate([
      {
        $project: {
          buyer: "$customer.email",
          totalPrice: {
            $sum: "$items.price",
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $sort: {
          totalPrice: -1,
        },
      },
    ])
    .toArray();

  // Business Requirement 2
  result = await collection
    .aggregate([
      {
        $group: {
          _id: "$purchaseMethod",
          count: {
            $count: {},
          },
        },
      },
    ])
    .toArray();

  // Business Requirement 3
  result = await collection
    .aggregate([
      {
        $project: {
          purchaseMethod: true,
          totalPrice: {
            $sum: "$items.price",
          },
        },
      },
      {
        $group: {
          _id: {
            purchaseMethod: "$purchaseMethod",
          },
          averagePrice: {
            $avg: "$totalPrice",
          },
        },
      },
    ])
    .toArray();

  // Business Requirement 4
  result = await collection
    .aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.name",
          count: {
            $count: {},
          },
          price:{
              $first:"$items.price"
          }
        },
      },
    ])
    .toArray();

  console.log(result);
})();
