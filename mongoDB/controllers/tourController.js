// const fs = require('fs')
const AppError = require("../../4-natours/after-section-10/utils/appError")
const Tour = require(`./../model/tourModel`)
const APIFeatures = require(`./../utils/APIFeatures`)
const catchAsync = require(`./../utils/catchAsync`)

// get rid of these file reaing from the file system because we will read from the database
//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// ROUTE HANDLERS

// we will get rid of the checkBody middleware, it is used just to check whether the data we are sending has a data or not
//of which our mongoose library wiil do that for us

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price ){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Not found'
//         })
//     }
//     next()
// }

// Refactoring using Class and Contructor Function

// class APIFeatures {
//     constructor(query, queryString) {
//         this.query = query
//         this.queryString = queryString
//     }

//     filter() {
//          // basic filtering 
//          const queryObj = {...this.queryString}
//          const excludedQuery = ['page', 'sort', 'limit', 'fields' ]
//          excludedQuery.forEach(el => delete queryObj[el])

//          //lets implement advance filtering to include checking for parameters taht are either less than or greater than
//          // for example lets check for where the duration is less than 5 and the price greater than 500

//          //Advance filtering using less than or greater than

//          let queryStr = JSON.stringify(queryObj)
//          queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
//         // console.log(JSON.parse(queryStr))

//         this.query.find(JSON.parse(queryStr))
//         //  let query = Tour.find(JSON.parse(queryStr))
//         return this
//     }


//     sort(){
//         //Sorting
//         if (this.queryString.sort){
//             const sortBy = this.queryString.sort.split(',').join(' ')
//             this.query = this.query.sort(sortBy)
//         }else{
//             this.query = this.query.sort(`-createdAt`)
//         }

//         return this
//     }

//     limitFields(){
//         //Limiting fields
//         if (this.queryString.fields){
//             const fields = this.queryString.fields.split(',').join(' ')
//             this.query = this.query.select(fields)
//         }else{
//             this.query = this.query.select(`-__v`)
//         }
//         return this
//     }

//     paginate(){
//          //Pagination .....implementing page request
//             // to implement pagination; we use the skip and the limit method;
//             // skip sets the current page number and limit set the number of content oo the page

//             const page = this.queryString.page * 1 || 1 // convert the query string to anumber and set a default value
//             const limit = this.queryString.limit * 1 || 100
//             const skip = (page - 1) * limit

//             this.query = this.query.skip(skip).limit(limit)
//             return this
//          }
// }

exports.aliasTopTours = ((req, res, next) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage'
    req.querry.fields = 'name,price,ratingsAverage,summary,difficulty'
    next()
})

exports.getAllTours = catchAsync(async (req, res, next) => {
            // Execute querry
            const features =new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate()
            const tours = await features.query
            res.status(200).json({
            status: 'success', 
            result: tours.length,
            data: { tours }
        })
})

exports.createTour = catchAsync(async (req, res, next) => {     
        // creating a new tour (post request)
        //initially we created a tour using the save method as 
        // newTour = new Tour.save(), we can equally do this using the create method which returns a promise and instead of using the then() method
        // we can use the async and await function

        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status: 'success', 
            requestTime: req.reqTime,
            data: { tour: newTour }
        })
})

exports.getTour = catchAsync(async (req, res, next) => {
        const tour = await Tour.findById(req.params.id)

        if(!tour){
            return next(new AppError(`No tour found with the ${req.url}`), 404)
        }
        res.status(200).json({
            status: 'success', 
            data: { tour }
        })
})

exports.updateTour = catchAsync(async (req, res, next) => {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!tour){
            return next(new AppError(`No tour found with the ${req.url}`), 404)
        }
        res.status(200).json({
            status: 'succes',
            data: { tour }
        })
})

exports.deleteTour = catchAsync(async (req, res, next) => {
            const tour = await Tour.findByIdAndDelete(req.params.id)
            if(!tour){
                return next(new AppError(`No tour found with the ${req.url}`), 404)
            }
            res.status(204).json({
            status: 'succes',
            data:  tour
        })
})

// AGGREGATION PIPELINE
// the aggregation pipeline is a mongoDB feature and can be accesed by mongoose
//the aggregation pipeline is just like using a regular query . the difference is that we can manipulate the data in differents steps,
// we pass in an array of stages in the define sequence

exports.getTourStats = catchAsync(async (req, res, next) => {
        const stats = await Tour.aggregate([
             {
                $match: {ratingAverage: {$gte: 4.5}}
             },
             {
                $group: {
                    _id: {$toUpper:'$difficulty'},
                    numTours: {$sum: 1},
                    numratings: {$sum: '$ratingQuantity'},
                    avgRating: {$avg: '$ratingAverage'},
                    avgPrice: {$avg: '$price'},
                    minPrice: {$min: '$price'},
                    maxPrice: {$max: '$price'}
                }
             },
             {
                $sort: { avgPrice: 1 }
              }
        ])
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        })
})

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
        const year = req.params.year * 1

        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: {$month: '$startDates'},
                    numToursStarts: { $sum: 1},
                    tours: { $push: '$name'},       
                }
            },
            {
                //if(_id === `${i + 1}` ),
                $addFields: { month: `$_id` }
            },
            {
                $project: { _id: 0 }
            },
            {
                $sort: {numToursStart: -1}
            },
            {
                $limit: 12
            }
        ])
        res.status(200).json({
            status: 'success',
            result: Tour.length,
            data: {
                plan
            }
        })
})