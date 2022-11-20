const mongoose = require('mongoose')
const slugify = require('slugify')

//Mongoose Schema definition
const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, `A tour must have a name`],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [10, 'A tour name must have more or equal then 10 characters']
        // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    ratingsAverage:{
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    ratingQuantity:{
        type: Number,
        default: 0
    },
    priceDiscount:{
        type: Number,
        validate: {
            validator: function(val) {
              // this only points to current doc on NEW document creation
              return val < this.price;
            },
            message: 'Discount price ({VALUE}) should be below regular price'
          }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, `A tour must have a description`]
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        trim: true,
        required: [true, `A tour must have a cover image`]
    },
    price:{
        type: Number,
        required: [true, `A tour must have a price`]
    }, 
    duration: {
        type: Number,
        required: [true, `A tour must have a duration`]
    },
    maxGroupSize: {
        type: Number,
        required: [true, `A tour must have a group size`]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    difficulty: {
        type: String,
        required: [true, `A tour must have a difficulty`],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, difficult'
          }
    },
    images: [String],
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
},
    
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

//Virtual properties
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7
})

//Mongoose Middlewares
/**Document middlewares */

tourSchema.pre('save', function(next){ //pre middlewares are excuted before the document is saved to the database, it only works for the save and create method
 this.slug = slugify(this.name, {lower: true})
 next()
})

// tourSchema.post('save', function(doc, next) { //post middlewares have access to two parameters, the document to be posted and the next function
//     console.log(doc)
//     next()
// })

// QUERY middleware; it runs before a certain querry is executed

tourSchema.pre(/^find/, function(next){
    this.find({secretTour: {$ne: true }} )
    next()
})

// AGGREGATION MIDDLEWARE; This middleware is run before the aggregation pipeline is excuted
tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  
    console.log(this.pipeline());
    next();
  });

//Creating a model
const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour