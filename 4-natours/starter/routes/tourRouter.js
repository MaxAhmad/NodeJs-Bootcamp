const express = require('express')

const tourController = require('./../controllers/tourController')

/**IMPLEMENTING TOURS ROUTE */

const tourRouter = express.Router()

tourRouter.param('id', tourController.checkID )

tourRouter.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createTour)
tourRouter.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour)

module.exports = tourRouter