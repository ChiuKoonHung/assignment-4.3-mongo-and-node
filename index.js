const { MongoClient } = require("mongodb"); 
const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri); 

(async () => {
    await client.connect();
    console.log("working");

    const db = client.db("sample_supplies");
    const sales = db.collection("sales");

    // const pipeline = [
    //     {$unwind: "$items"},
    //     {$group: {_id:'$_id', items: {$push: {$concat: [{$toString: "$items.price"}, " > ", {$toString: "$items.quantity"}]}}, total: {$sum: { $multiply: [ "$items.price", "$items.quantity" ] }} } },
    // ];

    // let result = await sales.aggregate(pipeline).toArray();
    // console.log(result);


    // const pipeline = [
    //     {
    //         $group: { _id: { purchaseMethod: "$purchaseMethod" }, Popularity: { $count: {} } },
    //     },
    //     ];
        
    //     result = await sales.aggregate(pipeline).toArray();
    //     console.log(result);


        // const pipeline = [
        //     {$unwind: "$items"},
        //     {$group: {_id:{ "purchaseMethod":"$purchaseMethod" }, items: {$push: {$concat: [{$toString: "$items.price"}, " > ", {$toString: "$items.quantity"}]}}, AvgSpending: {$avg: { $multiply: [ "$items.price", "$items.quantity" ] }} } },
        //     ];
        
        //     result = await sales.aggregate(pipeline).toArray();
        //     console.log(result);


	// const pipeline = [
	// 	{ $group: { _id: '$items.name', noOfOccurences: { $count: {} }, price: {$first: '$items.price' } }},

	// 	{ $sort: { noOfOccurences: -1 } },

	// 	{$limit: 10}
	// ];
    //     result = await sales.aggregate(pipeline).toArray();
    //     console.log(result);
})();