/**
 * Mongodb is a NoSQL database, a non-relational database that contains one or more collection; a collection can be seen as a set of 
 * tables of data in relational databases
 * it stores data in form on a document which are filled values pairs called BSON which looks like JSON not in tables like the relational databases
 * with keys: and values
 * MongoDb has a concept of embeded documents; key fields with mutiple value fields like a object inside another object. This form of data representation
 * is to put together data that are related which is somewhat difficult with the relational database
 * each documents contains a unique ID which is automatically generated
 */

/**
 * Mongoose 
 * This is an object data modelling library for mongoDB and nodejs
 * Mongoose allows a repid and simple development of mongoDB databases
 * the mongoose library gives us functional of a schema, model and middlewares
 * mongoose schema is a functionality we use in modelling our data, i.e; it provides us with an interface to write out template
 * for storing data into our databases as well as providing validation sttributes to our data and setting default values to our data
 * The mongoose model is a wrapper for the schema, it provides us a functionality of writing features to our databases and as well retrieving data from our databases
 * using the schema structure
 * 
 * lets look at how to define and implement schemas and models in the server.js file
 */

/**
 * Introduction to MVC Architecture (MODEL VIEW CONTROLLER)
 * The MVC architecture comprises of how we structure our application
 * The Model layer is concerns withe the business logic and the problem the architecture it is going to solve, like showing tours to users in the natours project
 * The Controller layer or application logic is concerns with the code written to make the app work, a big part of application logic in express
 * is all about managing request and response
 * the views is how we render the website or application to the uses 
 */

/**
 * Refactouring for MVC
 * we will get ride of the functionality for reading file from our JSON file system
 * so that we can read directly from our database
 */

/**
 * Filtering
 * filtering usually allows a user look for a specific data in the database
 * like making a custom search
 * Filtering is done using a querry string
 * lets say we want to find or filter only tours in our natours app with a difficulty of easy or with a duration of 5
 * we use the querry string which we can access using an inbuilt object called req.querry
 * lets implement it in our get all tours api
 * we can specify the querry strings using mongoose inbuilt methods, we pass it as an object into the find() meethod like:
 * await Tours.find({duration=5, difficulty=easy}), Or more easily we can just specific the req.querry into the find method like 
 * find(req.querry)
 * the problem with this type of implementation is too simple and because we will have other querry functionality like pagination, sorting
 * we will have to exclude this functionality from the querry string so that we dont includes this in our filtering
 * we will have to create a hard copy of the req.querry object by using destructuring 
 */

/**Agregation Pipeline in MongoDB
 * this a mongoDB framework where all documents from a certain collection go through where the are process step by step 
 * we can use the aggergation pipeline to caculate averages, mimminum or maximum values or distances
 * The aggregation pipeline can be used for solving business problems like knowing the busiest months so far,
 * the most expensive months in relating to the natours project
 * 
*/

/**
 * 
 */

// let months = [ 'january', 'feburary', 'arch', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// months.forEach(el => console.log(months[el]))

/**
 * VIRTUAL PROPERTIES
 * These properties are created in the model schema and are not stored in the database
 */

/**MONGOOSE MIDDLEWARE
 * just like the concept of express middlewares
 * Mongoose middleware are functions that runs before or after an event happens in the mongoose architecture
 * events like saving, creating or insert methods
 * there are four different types of middlewares in mongoose;
 * Document, Querry, Model and Aggregate middlewares
 * 
 */

/**ERROR HANDLING IN EXPRESS */
// In instances where users hit a route that is not catched in the error, our code is likely to missbehave,
// to solve isues of undefined routes that could throw undefined errors, we need to set a defined error irrespective of what HTTP verb/method is been used
// we use the app.all() method which set it to what ever method the user is using
/**
 * Errors are of two types;
 * Operational errors which we as developers anticipate in the course of building our application; such errors like undefined routes, 
 * server connectivity problems of which we can handle
 * And Programming errors that we as developers introduce unknowingly into our code during development
 * to handle errors; we can create a universal/global error middleware to catch most especially the operational errors
 */

/**
 * how we wrote our code before factoring for error handling
 * exports.deleteTour = async (req, res) => {
    try{
            await Tour.findByIdAndDelete(req.params.id)
            res.status(204).json({
            status: 'succes',
            data:  null
        })
    } catch (err){
            res.status (err) (400).json({
            status: 'fail',
            message: err
        }) 
    }
    
}
 */

/**ERRORS IN DEVELOPMENT AND PRODUCTION
 * Errors in development and production are different
 * When in Development you would want to get as much informantion needed on the error 
 * whereas while in production; you will only need to display a base information to the user about the errors
 * This takes us to the oprational errors which we know would happen if the user hit an undefined route
 * 
 */