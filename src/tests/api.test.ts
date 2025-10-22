import { testData, bookingResponseSchema, bookingDataSchema, adminCredentials } from '../data/data';

import { BookingService } from '../business/services/booking.service';

interface BookingIdResponse {
  bookingid: number;
}

let token: string;
let testBookingId: number;

describe('Restful Booker API Tests', () => {
  let bookingService: BookingService;

  beforeAll(async () => {
    bookingService = new BookingService();
    // Simple way to get POST method
    token = await bookingService.createToken(adminCredentials.username, adminCredentials.password);

    expect(token).toBeDefined();
  });

  it('should ping the API successfully', async () => {
    const bookingService = new BookingService();
    const pingResponse = await bookingService.pingApi();

    expect(pingResponse).toBe(201);
  });

  it('should create a new booking and validate response', async () => {
    const bookingService = new BookingService();
    // Step 1: Create a new booking
    const response = await bookingService.createBooking(testData.newBooking);
    testBookingId = response.bookingid;

    // Step 2: Validate response structure with Joi
    const { error } = bookingResponseSchema.validate(response);
    expect(error).toBeUndefined();

    // Step 3: Validate specific values
    expect(response.bookingid).toBeDefined();
    expect(typeof response.bookingid).toBe('number');
    expect(response.booking.firstname).toBe(testData.newBooking.firstname);
    expect(response.booking.lastname).toBe(testData.newBooking.lastname);
  });

  it('should get new booking ID created in previous test and validate response', async () => {
    const bookingService = new BookingService();
    const booking = await bookingService.getSpecificBookingId(testBookingId);

    // Validate response structure
    const { error } = bookingDataSchema.validate(booking);
    expect(error).toBeUndefined();

    expect(booking).toBeDefined();
    expect(booking.firstname).toBe(testData.newBooking.firstname);
    expect(booking.lastname).toBe(testData.newBooking.lastname);
  });

  it('should update a booking completely', async () => {
    const bookingService = new BookingService();
    // Use the booking created in previous test
    const updatedResponse = await bookingService.updateBooking(
      testBookingId,
      testData.updatedBooking,
      token
    );

    // Validate response structure
    const { error } = bookingDataSchema.validate(updatedResponse);
    expect(error).toBeUndefined();

    // Validate updated values
    expect(updatedResponse.firstname).toBe(testData.updatedBooking.firstname);
    expect(updatedResponse.lastname).toBe(testData.updatedBooking.lastname);
    expect(updatedResponse.totalprice).toBe(testData.updatedBooking.totalprice);
  });

  it('should partially update a booking', async () => {
    const bookingService = new BookingService();
    // Partial update using PATCH
    const partialResponse = await bookingService.updatePartialBooking(
      testBookingId,
      testData.partialUpdateBooking,
      token
    );

    // Validate that only specified fields were updated
    expect(partialResponse.firstname).toBe(testData.partialUpdateBooking.firstname);
    expect(partialResponse.lastname).toBe(testData.partialUpdateBooking.lastname);
    // Other fields should remain from previous update
    expect(partialResponse.totalprice).toBe(testData.updatedBooking.totalprice);
  });

  it('should delete a booking', async () => {
    const bookingService = new BookingService();
    // Delete the booking created in previous tests
    const deleteStatus = await bookingService.deleteBooking(testBookingId, token);
    expect(deleteStatus?.status).toBe(201);
  });

  // Bonus: Get all booking IDs
  it('should get all booking IDs', async () => {
    const bookingService = new BookingService();
    const bookingIds = await bookingService.getAllBookingIds();

    expect(Array.isArray(bookingIds)).toBe(true);
    expect(bookingIds.length).toBeGreaterThan(0);

    // Each item should have bookingid property
    bookingIds.forEach((booking: BookingIdResponse) => {
      expect(booking).toHaveProperty('bookingid');
      expect(typeof booking.bookingid).toBe('number');
    });
  });
});
