// To use a module in our development, we use the require function/method to import into our code

const fs = require('fs')
const http = require('http') // this gives us a network capability such as building an http server
const url = require('url')
const path = require('path')
const replaceTemplate = require('./modules/replaceTemplate.js')

const slugify = require('slugify')

/**FILES SYSTEM SECTION */

/**
 * how to read contents from other files into another variable
 * we use the require method to get the module to import the file and use the readFileSync function which takes two argument
 * the first argument takes the path from where the file is located and the second argument is the character encoding
 */
//BLOCKING SYNCHRONOUS CODE




// const textIn = fs.readFileSync('.\\txt\\input.txt', 'utf-8')

// // const hello = 'hello world'

// console.log(textIn)

// /**
//  * How to write to files
//  * 
//  */

// const textOut = `This is what we know about the Avacado: ${textIn}.\nCreted on ${Date.now()}`

// fs.writeFileSync('.\\txt\\output.txt', textOut)

// console.log('file written!')


/**
 * reading a file and saving it into a file as we did above is done in a synchronous way
 * each line of code is read line by line because a certain operation is done first before going to the second one
 * this becomes a problem because the tasks have to queue before the get executed
 * hence the name synchronous BLOCKING code
 * the solution is to use Asynchronous non-blocking code
 * in this way a callback function is called to handle a task and when its done it gets executed
 * This feature of Asynchronous Non-blocking code is impoortant because NODE.Js uses a single thread to excute a task
 * because it is single threaded; if you have multiple users using your application and the happen to use a synchronous blocking code 
 * other users will have to wait for the first user to finish his execution before the are allowed to get acces to the application
 * But with the Asynchrounous non-blocking code multiple users can get access to the application all at the same time using the callback function 
 * to log in their request and when it is done the callback function is used to call the task and execute the users task
 */

// NON_BLOCKING ASYNCHRONOUS CODE

// fs.readFile('.\\txt\\start.txt', 'utf-8', (err, data)=>{
//     console.log(data)
// })
// console.log('Will read file')

/**
 * Lets show how multiple steps work using a callback function
 * steps that depends on the results of the previous steps
 */

//  fs.readFile('.\\txt\\start.txt', 'utf-8', (err, data1)=>{
//     fs.readFile(`.\\txt\\${data1}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2)
//         fs.readFile('.\\txt\\append.txt', 'utf-8', (err, data3)=>{
//             console.log(data3)

//             fs.writeFile('.\\txt\\final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log(`your file has been written`)
//             })
//         })
//     })
// })
// console.log('Will read file')


/**SERVER SECTION */

// creating a server
// const server = http.createServer((req, res) => {
//     //console.log(req)
//     res.end(`Hello from the server`)
// })

// const server = http.createServer((req, res) => {
//     //console.log(req)
//     res.end(`Hello from the server`)
// })

// //Listening to request from the client
// // listening accept parameters like PORT; it is a sub address on a certain host, HOST  
// server.listen(8000, '127.0.0.1', () => {
//     console.log('Listening to requests on port 8000')
// })

/**ROUTING 
 * Routing basically means implementing different actions for different URLs
 * Routing becomes complicated in a very big real world application; in that case we use a dependency called express
 * but for the sake of these lecture we will use the in builtd node module
*/

/**
const server = http.createServer((req, res) => {
    const pathName = req.url

    if(pathName === '/' || pathName === '/overview'){
        res.end(`This is the OVERVIEW`)
    }else if(pathName === '/product'){
        res.end(`This is the PRODUCT`)
    }else{
        res.writeHead(404, {
            //we can specify custom header
            'content-type': 'text/html'
        })
        res.end(`<h1>Page is not found</h1>`)
    }

})
 
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})
*/

//Building a simple API

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
// //const dataObj = JSON.parse(data)

// const server = http.createServer((req, res) => {
//     const pathName = req.url

//     if(pathName === '/' || pathName === '/overview'){
//         res.end(`This is the OVERVIEW`)
//     }else if(pathName === '/product'){
//         res.end(`This is the PRODUCT`)
//     } else if(pathName === '/api'){
//             res.writeHead(200, {'content-type' : 'application/json'})
//             res.end(data)
//             //console.log(data)
//     }else{
//         res.writeHead(404, {
//             //we can specify custom header
//             'content-type': 'text/html'
//         })
//         res.end(`<h1>Page is not found</h1>`)
//     }

// })
 
// server.listen(8000, '127.0.0.1', () => {
//     console.log('Listening to requests on port 8000')
// })

const overviewPath = path.join()

const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')
const cards = fs.readFileSync(`${__dirname}/templates/cards.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true)
    console.log(req)

    //overview route
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'content-type' : 'text/html'})

        const cardsHtml = dataObj.map(el => replaceTemplate(cards, el)).join('')
        const output = overview.replace('{#PRODUCT_CARDS#}', cardsHtml)
        res.end(output)
    //product route
    }else if(pathname === '/product'){
        res.writeHead(200, {'content-type' : 'text/html'})
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

    //API
    } else if(pathname === '/api'){
            res.writeHead(200, {'content-type' : 'application/json'})
            res.end(data)
    // Error/ Not Found route
    }else{
        res.writeHead(404, {
            //we can specify custom header
            'content-type': 'text/html'
        })
        res.end(`<h1>Page is not found</h1>`)
    }

})
 
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})


















