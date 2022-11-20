/**SERVER */
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
const app = require('./app');

//console.log(process.env)

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    //console.log(con.connections)
})



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

