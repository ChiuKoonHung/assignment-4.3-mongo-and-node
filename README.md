# MongoDB & Node.js: Assignment

## Brief

In this assignment, we will use the database `sample_supplies` and collection `sales`. Based on the stated business requirements, you are to write queries and aggregations (as answers) that produce results to meet the needs. This assignment will not tell you which data to query and what to return. You have to make a sensible decision on your own with optimization in mind. The general rule is not to produce data that are more than required. 


No codebase is provided in this assignment. You are to set up Node project and install `mongodb` package. Write mongo operations with Node.js and ensure those are working code. Copy the relevant code (the query/aggregation pipeline) to answer the questions here. 


### Business Requirement 1 - List the total cost for each purchase. (sum up the `price` properties in array `items`)

```
//
    const pipeline = [
        {$unwind: "$items"},
        {$group: {_id:'$_id', items: {$push: {$concat: [{$toString: "$items.price"}, " > ", {$toString: "$items.quantity"}]}}, total: {$sum: { $multiply: [ "$items.price", "$items.quantity" ] }} } },
    ];

    let result = await sales.aggregate(pipeline).toArray();
    console.log(result);

// Will return {customer_email: 'aroru@ti.yt',totalCost: new Decimal128("353.91")}...
```

### Business Requirement 2 - What are the different types of purchase method and which are more popular?

```
// 
    const pipeline = [
        {
            $group: { _id: { purchaseMethod: "$purchaseMethod" }, Popularity: { $count: {} } },
        },
        ];
        
        result = await sales.aggregate(pipeline).toArray();
        console.log(result);

// Will return { _id: { purchaseMethod: 'Online' }, Popularity: 1585 }...
```

### Business Requirement 3 - What is the average spending for the distinct purchase methods?

```
//
       const pipeline = [
            {$unwind: "$items"},
            {$group: {_id:{ "purchaseMethod":"$purchaseMethod" }, items: {$push: {$concat: [{$toString: "$items.price"}, " > ", {$toString: "$items.quantity"}]}}, AvgSpending: {$avg: { $multiply: [ "$items.price", "$items.quantity" ] }} } },
            ];
        
            result = await sales.aggregate(pipeline).toArray();
            console.log(result);
```

### Business Requirement 4 - What are the top 10 most popular purchased items and their price?

```
// 
	const pipeline = [
		{ $group: { _id: '$items.name', noOfOccurences: { $count: {} }, price: {$first: '$items.price' } }},

		{ $sort: { noOfOccurences: -1 } },

		{$limit: 10}
	];
        result = await sales.aggregate(pipeline).toArray();
        console.log(result);

//   {_id: [ 'notepad' ], noOfOccurences: 128, price: [ new Decimal128("10.86") ]}...
```

## Submission Guidelines

- Cite any relevant sources consulted during your research
- Solve the problems using your own code
- Do not copy and paste solutions from the source material
- Submit your assignment to black board.