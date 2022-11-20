const fs = require('fs')
const superagent = require('superagent')

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`breed: ${data}`)

//         superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .end((err, res) => {
//             console.log(res.body.message)
        
//         fs.writeFile('dog-img.txt', res.body.message, err => {
//             if(err) return console.log(err.message)
//             console.log('Dog image save to file')
//         })
//     })
// })


/**
 * How to solve the callback hell function
 * We use a javascript promise
 * A promise basically implements a concept of a future value, i.e a value we are expecting to recieve or use later in our code
 * to consume a promise, we use the then() method and pass it a callback function
 * in consuming a promise, two methods are required; first is the The then() method which handles a succesful logic, i.e the resolve parameter
 * and the catch() method which handles the error or unsuccesful result, i.e the reject parameter
 */

//  fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`breed: ${data}`)

//             superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//             .then(res => {
//                 console.log(res.body.message)
            
//             fs.writeFile('dog-img.txt', res.body.message, err => {
//                 if(err) return console.log(err.message)
//                 console.log('Dog image save to file')
//             })
//         }).catch(err => {
//             console.log(err.message)
//     })
// })


/**How to build a promise */

const readFilePromise = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
        if(err) reject(`the file could not be found`)
        resolve (data)
        })
    })
}

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
        if(err) reject(`the file could not be written`)
        resolve (`Succesful`)
        })
    })
}

// readFilePromise(`${__dirname}/dog.txt`).then(data => {
//     console.log(`breed: ${data}`)
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//         }).then(res => {
//                 console.log(res.body.message)
//             return writeFilePromise('dog-img.txt', res.body.message)
//         }).then(() => {
//                 console.log(`randon dog image written to file`)
//         }).catch(err => {
//             console.log(err.message)
//     })


/**Consuming promises with Astnc/Await 
 * consuming promises using async and await is better than using hte then() method because it makes our code more readable and cleaner
 * an async/await function returns a promise automatically and thiss return value is known as the resolve value
 * the async and await function always runs in the background, i.e it does not block the thread
 * what the event loop does is that it offloads it to the background, while the async/await functions runs in the background, the thread continues
 * to execute other functionality and calls the async and await function when it is done
*/

// const getDogPic1 = async () => {
//     try{
//         const data = await readFilePromise(`${__dirname}/dog.txt`)
//         console.log(`breed: ${data}`)
//         const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//         console.log(res.body.message)

//         await writeFilePromise('dog-img.txt', res.body.message)
//         console.log(`randon dog image written to file`)
//     }catch (err){
//         console.log(err)
//         throw err
//     }
//     return `2: READY `
// }
//getDogPic()

// console.log(`1: get dog pics`)
// const x = getDogPic1()
// console.log(x)
// console.log(`3: Done getting dog pics`)

/**
 * By default this code will run asynchronously displaying a x variable as a pending promise without displaying the getDogPic function
 * Since it is a promise we can call the then() method to retrieve the data in real time shown below
 */
/**
  * This will run smoothly but when there is an error, it will not catch the error 
  * to catch the error, we will use a javascript built in function; throw in the catch block
  */

//  console.log(`1: get dog pics`)
//  getDogPic1().then(x =>{
//     console.log(x)
//     console.log(`3: Done getting dog pics`)
//  }).catch(err =>{
//     console.log(`error`)
//  })


/**
 * The problem with the then() method is that it mixes async/await function with promises
 * lets use the async and await function to run it in real time, in doing this, we use the IMMEDIATELY INVOKE FUNCTION (IIFE)
 * For example
 */

// (async () => {
//     try{
//         console.log(`1: get dog pics`)
//         const x = await getDogPic1()
//         console.log(x) 
//         console.log(`3: DOne getting dog pics`)
//     } catch(err){
//         console.log(`ERROR`)
//     }
// })()


/**Waiting for Multiple Promises Simultaneously
 * Lets say we want to get three random dog images at the same time, we could wait the API call at the same time
 * like await superagent.get(---URL----)
 *      await superagent.get(---URL----)
 *      await superagent.get(---URL----)
 * this will add unnecessary waiting time
 * what we can do is to save the promise into a variable and not the resolve value
 */

 const getDogPic2 = async () => {
    try{
        const data = await readFilePromise(`${__dirname}/dog.txt`)
        console.log(`breed: ${data}`)
        const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)

        const all = await Promise.all([res1, res2, res3])
        const imgs = all.map(ell => ell. body.message)
        console.log(imgs)

        await writeFilePromise('dog-img.txt', imgs.join('\n'))
        console.log(`randon dog image written to file`)
    }catch (err){
        console.log(err)
        throw err
    }
    return `2: READY `
}

(async () => {
    try{
        console.log(`1: get dog pics`)
        const x = await getDogPic2()
        console.log(x) 
        console.log(`3: DOne getting dog pics`)
    } catch(err){
        console.log(`ERROR`)
    }
})()
