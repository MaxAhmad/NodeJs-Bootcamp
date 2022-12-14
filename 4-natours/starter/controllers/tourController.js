const fs = require('fs')


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// ROUTE HANDLERS

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is ${val}`)
    const id = Number(req.params.id)
    const tour = tours.find(el => el.id === id)
    if(!tour){
        return res.status(404).json({
            status: 'Fail', 
               message: 'Not Found'
        })
    }
    next()
}

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price ){
        return res.status(404).json({
            status: 'fail',
            message: 'Not found'
        })
    }
    next()
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success', 
        requestTime: req.reqTime,
        result: tours.length,
        data: { tours }
    })
}

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({id: newId}, req.body)
    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success', 
            requestTime: req.reqTime,
            data: { tour: newTour }
        })
    })
}

exports.getTour = (req, res) => {
        res.status(200).json({
            status: 'success', 
            data: { tour }
        })
}

exports.updateTour = (req, res) => {
    
   
    res.status(200).json({
        status: 'succes',
        data: { tour: '<Update tour>'}
    })
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'succes',
        data:  null
    })
}