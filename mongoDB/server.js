/**SERVER */
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});
const app = require('./app');

//console.log(process.env)

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD)

// Database connection
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to DB')
})


// testing writing and saving to our database

// const testTour = new Tour({
//     name: 'The Forest Hiker',
//     rating: 4.7,
//     price: 478
// })

// to save the file to the database, we use a the save method
// and the save method returns us a promise that we can consume
// we cannot write or save a document twice into the database because of the vaidation functionality 
// it will throw us an error of duplicate key, or a validation error of required 

// testTour.save().then(doc => {
//     console.log(doc)
// }).catch(err => {
//     console.log(err)
// })


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});








