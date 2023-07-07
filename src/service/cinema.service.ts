import dotenv from 'dotenv';
import Main from '../utility/main';
import { Booking } from '../screen.type';
import { BookingStatus, TicketBooking } from '../utility/enums.options';
import { Semaphore } from './semaphore.service';

dotenv.config();

export class CinemaService {
  private MAX_CAPACITY: number;
  private semaphore: Semaphore;
  private utility = new Main();
  private currentBookingCount: number = 0;
  private Bookings: Array<TicketBooking> = [];

  constructor() {
    this.MAX_CAPACITY = parseInt(process.env.MAX_SEAT as string, 10); // Specify the radix value (10) for parseInt()
    this.semaphore = new Semaphore(this.MAX_CAPACITY);
  }

  public async bookTickets(ticketPayload: Booking): Promise<{ booking?: TicketBooking; bookingId?: string, 
    isBookedOut?: boolean, isExceedMax?: boolean, status: string}> {
    try {
      let isBookedOut = false;
      let isExceedMax = false;
      const availableSeats = this.calculateAvailableSeats(this.currentBookingCount);
  
      if (availableSeats <= 0) {
        isBookedOut = true;
        return { isBookedOut, status: "TICKET_BOOKED_OUT" };
      }
  
      if (ticketPayload.requestedSeats > availableSeats) {
        isExceedMax = true;
        return { isExceedMax, status: "REQUEST_EXCEED_MAX_TICKET" }
      }
      const bookingId = this.utility.generateBookingId();

      if (availableSeats == 0 || ticketPayload.requestedSeats > availableSeats) {
        return { isBookedOut, status: "TICKET_BOOKED_OUT" }
      }
      const booking = await this.createBooking(ticketPayload, bookingId, availableSeats);
      this.semaphore.release();
  
      return { booking, bookingId, isBookedOut, status: "SUCCESSFUL" };
    } catch (e) {
      throw e;
    }
  }

  private calculateAvailableSeats(currentBookingCount: number): number {
    let availableSeats: number;

    if (currentBookingCount > 0) {
      availableSeats = this.MAX_CAPACITY - currentBookingCount;
    } else {
      availableSeats = this.MAX_CAPACITY;
    }

    return availableSeats;
  }

  private async createBooking(ticketPayload: Booking, bookingId: string, availableSeats: number): Promise<TicketBooking> {

    const priceOptions = [10, 13, 14, 20]; // Use an array for price options
    const movieTitleOptions = ['Extraction 2', 'Wedding Party 2']; // Use an array for movie title options

    let status: BookingStatus = BookingStatus.Available;

    if (availableSeats < ticketPayload.requestedSeats) {
      status = BookingStatus.NotAvailable;
    }

    const booking: TicketBooking = {
      seats: ticketPayload.requestedSeats,
      price: priceOptions[0], // Select the first price option for now
      movieTitle: movieTitleOptions[0], // Select the first movie title option for now
      bookingId: bookingId,
      status: status,
    };

    this.Bookings.push(booking);
    this.currentBookingCount += booking.seats;
    return booking;
  }

  public async getTickets(): Promise<Array<TicketBooking>> {
    return this.Bookings.slice(); // Using slice() to return a shallow copy of the Bookings array
  }
}
