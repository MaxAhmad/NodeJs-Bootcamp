const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const Tour = require('./../../model/tourModel')

dotenv.config({ path: './config.env'});


//console.log(process.env)

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD)

// Database connection
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    //console.log(con.connections)
})


const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

//import data into database
const importData = async () => {
    try{
        await Tour.create(tours)
        console.log('data successfully created')
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

//delete data into database
const deleteData = async () => {
    try{
        await Tour.deleteMany()
        console.log('data successfully deleted')
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

if(process.argv[2] === `--import`){
    importData()
} else if (process.argv[2] === `--delete`){
    deleteData()
}
