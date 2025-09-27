import Joi from "joi";

// Joi schemas for validation
export const bookingResponseSchema = Joi.object({
  bookingid: Joi.number().required(),
  booking: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    totalprice: Joi.number().required(),
    depositpaid: Joi.boolean().required(),
    bookingdates: Joi.object({
      checkin: Joi.string().required(),
      checkout: Joi.string().required()
    }).required(),
    additionalneeds: Joi.string().allow('').optional()
  }).required()
});

export const bookingDataSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  totalprice: Joi.number().required(),
  depositpaid: Joi.boolean().required(),
  bookingdates: Joi.object({
    checkin: Joi.string().required(),
    checkout: Joi.string().required()
  }).required(),
  additionalneeds: Joi.string().allow('').optional()
});

export const testData = {
  newBooking: {
    firstname: 'bruce',
    lastname: 'wayne',        
    totalprice: 150,           
    depositpaid: true,         
    bookingdates: {           
      checkin: '2023-10-01',
      checkout: '2023-10-10'
    },
    additionalneeds: 'Bottles of water' 
  },
  updatedBooking: {
    firstname: 'clark',
    lastname: 'kent',
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
      checkin: '2023-11-01',
      checkout: '2023-11-15'
    },
    additionalneeds: 'Breakfast'
  },
  partialUpdateBooking: {
    firstname: 'diana',
    lastname: 'prince'
  }
}

export const urls = {
  BASE_URL: 'https://restful-booker.herokuapp.com/booking',
  AUTH_URL: 'https://restful-booker.herokuapp.com/auth',
  PING_URL: 'https://restful-booker.herokuapp.com/ping'
}

export const adminCredentials = {
  username: 'admin',
  password: 'password123'
}