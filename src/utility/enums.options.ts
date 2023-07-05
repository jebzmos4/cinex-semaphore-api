export enum BookingStatus {
Available = "available",
  NotAvailable = "not available"
}

export interface TicketBooking  {
  seats: number;
  bookingId: string;
  price: number;
  status: string;
  movieTitle: string;
}