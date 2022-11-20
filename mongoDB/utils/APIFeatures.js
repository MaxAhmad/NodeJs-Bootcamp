

class APIFeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filter() {
         // basic filtering 
         const queryObj = {...this.queryString}
         const excludedQuery = ['page', 'sort', 'limit', 'fields' ]
         excludedQuery.forEach(el => delete queryObj[el])

         //lets implement advance filtering to include checking for parameters taht are either less than or greater than
         // for example lets check for where the duration is less than 5 and the price greater than 500

         //Advance filtering using less than or greater than

         let queryStr = JSON.stringify(queryObj)
         queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        // console.log(JSON.parse(queryStr))

        this.query.find(JSON.parse(queryStr))
        //  let query = Tour.find(JSON.parse(queryStr))
        return this
    }


    sort(){
        //Sorting
        if (this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort(`-createdAt`)
        }

        return this
    }

    limitFields(){
        //Limiting fields
        if (this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        }else{
            this.query = this.query.select(`-__v`)
        }
        return this
    }

    paginate(){
         //Pagination .....implementing page request
            // to implement pagination; we use the skip and the limit method;
            // skip sets the current page number and limit set the number of content of the page

            const page = this.queryString.page * 1 || 1 // convert the query string to anumber and set a default value
            const limit = this.queryString.limit * 1 || 100
            const skip = (page - 1) * limit

            this.query = this.query.skip(skip).limit(limit)
            return this
         }
}

module.exports = APIFeatures