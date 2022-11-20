const fs = require('fs')

const express = require('express')

const app = express()
const morgan = require('morgan')

const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter')

/**MIDDLEWARES */
if(process.env.NODE_ENV === 'DEVELOPMENT'){ //need to clarify environment variables, more studies
app.use(morgan('dev'))
}

app.use(express.json()) //middleware, it modifies an incoming data, it stands between the request and the response object

app.use((req, res, next) => {
    req.reqTime = new Date().toISOString()
    next()
})

app.use(express.static(`${__dirname}/plublic`)) // middleware use to server static flies

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app

// app.get('/', (req, res) => {
//     res.status(200).send(`Hello from the server`)
// })



/**
 * APIs & RESTful API Design
 * APIs simply known as Application Programming Interface
 * it is used as a meduim or a piece of software that allows applications to communicate with each other
 * REST
 * Representational States transfer; is basically way of building web APIs in a logical way making them easier to consume
 * 
 */


/**ROUTE HANDLES & ROUTE */

/* app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success', 
        result: tours.length,
        data: { tours }
    })
   
})

app.get('/api/v1/tours/:id', (req, res) => {
        const id = Number(req.params.id)
        const tour = tours.find(el => el.id === id)

        if(!tour){
            return res.status(404).json({
                status: 'Fail', 
                   message: 'Not Found'
            })
        }else{
        res.status(200).json({
            status: 'success', 
            data: { tour }
        })
    }
})

app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({id: newId}, req.body)
    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success', 
            data: { tour: newTour }
        })
    })
})

app.patch('/api/v1/tours/:id', (req, res) => {
    if(req.params.id > id){
        return res.status(404).json({
            status: 'Fail', 
               message: 'Not Found'
        })
    }
    res.status(200).json({
        status: 'succes',
        data: { tour: '<Update tour>'}
    })
})

app.delete('/api/v1/tours/:id', (req, res) => {
    if(req.params.id > id){
        return res.status(404).json({
            status: 'Fail', 
               message: 'Not Found'
        })
    }
    res.status(204).json({
        status: 'succes',
        data:  null
    })
})
*/


//REFACTOR OUR CODE


/**Immplementing Users Route Handles */



/**ROUTES */

// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id', getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

// We can still chain the HTTP methods together

/**
 * tourRouter.route('/').get(getAllTours).post(createTour)
    tourRouter.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)
 */



/**MIDDLEWARE
 * Middlewares are functions are that modify our codes
 * they are executed between the middle of request and response handles
 * Examples of middlewares is the JSON parser, even our routers are called middlewares
 * the middlewares is the logic behind the request-response cycle of express
 * middlewares basically is what goes on i.e the logic that happens from the time the client make a request to the server 
 * till the time the server makes a response.
 * It can be simply put as all the codes between the request and response cycle
 * to use middlewares; we use app.use() function/method
 * In creating our own middlewares, we have access to the request and response function and a next function 
 * like; app.use((req, res, next) => {.....})
 * Middlewares are createdv at the beginning of our code in other for our code base to get access to the middleware
 */

/**Let refactor our entire code
 * firstly we will seperate all the users route and the tours route into seperate files by creating a routes folder and create seperates user and tour routes
 */


// /**SERVER */

// const port = 3000
// app.listen(port, () => {
//     console.log(`App running on port ${port}`)
// })

/**ENVIRONMENT VARIABLES
 * Nodejs runs on different environment, the most important ones are the DEVELOPMENT ENVIRONMENT and THE PRODUCTION ENVIRONMENT
 * By default express set the environment to development
 * check the server file for environment illustration
 */