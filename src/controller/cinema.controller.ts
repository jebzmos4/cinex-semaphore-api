import { Request, Response } from 'express';
import { CinemaService } from '../service/cinema.service';
import { Booking } from '../screen.type';
import { StatusCodes } from 'http-status-codes';
import log from '../utility/logger';

export class CinemaController{
    private cinemaService = new CinemaService();

    public async bookTickets(req: Request, res: Response): Promise<any> {
      const requestTime = this.getTime();;
      const TicketBooking : Booking = {
        requestedSeats: req.body.requestedSeats,
        showtime : req.body.showtime,
        price : req.body.price,
        movieTitle : req.body.movieTitle,
       status : req.body.status
    }
      try {
          const {booking, bookingId, isBookedOut, isExceedMax, status, availableSeat }= await this.cinemaService.bookTickets(TicketBooking);
          const completionTime = this.getTime();
          if (isExceedMax) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Requested number of seats exceeds available seats', status, requestTime, completionTime, availableSeat })
          else if (isBookedOut) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No available seats', status, requestTime, completionTime, availableSeat })
          log.info({booking});
          res.status(StatusCodes.ACCEPTED).json({bookingId, message : 'Tickets booked successfully.', status, requestTime, completionTime, availableSeat})
      } catch (error) {
        const completionTime = this.getTime();
          log.info(error);
          console.log(error);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "", message: 'An error occurred while processing the request.', status: "FAILED", requestTime, completionTime });
      }  
    }

    public async getickets(req: Request, res: Response): Promise<any> {
      try {
        const bookings = await this.cinemaService.getTickets();
        log.info({bookings});
        res.status(StatusCodes.ACCEPTED).json({bookings, message : 'Tickets fetched successfully.'})
    } catch (error) {
        log.info(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while processing the request.' });
    }  
    }

    public async setMaxSeat(req: Request, res: Response): Promise<any> {
      try {
        const maxSeat = parseInt(req.params.maxSeat);
          const setSeat = await this.cinemaService.setMaxSeat(maxSeat);
          console.log(setSeat);
          res.status(StatusCodes.ACCEPTED).json({message : 'Seat Set successfully.', setSeat})
      } catch (error) {
        log.info(error);
          console.log(error);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "", message: 'An error occurred while processing the request.', status: "FAILED"});
      }
    }

    public async clearBookings(req: Request, res: Response): Promise<any> {
      try {
          const bookings = this.cinemaService.clearBookings();
          res.status(StatusCodes.ACCEPTED).json({message : 'Bookings Cleared', bookings})
      } catch (error) {
        log.info(error);
          console.log(error);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "", message: 'An error occurred while processing the request.', status: "FAILED"});
      }
    }

    private getTime(): string {
      const currentDate = new Date();

      const year = String(currentDate.getFullYear()).slice(-2);
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      const milliSeconds = String(currentDate.getMilliseconds()).padStart(2, '0');

      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliSeconds}`;
      console.log(formattedTime);
      return formattedTime;
    }

    public async getAvailableSeat(req: Request, res: Response): Promise<any> {
      try {
          const { availableSeats, currentBookingCount, maxSeat } = this.cinemaService.getAvailableSeats();
          res.status(StatusCodes.ACCEPTED).json({message : 'Seats Fetched', availableSeats, currentBookingCount, maxSeat });
      } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "", message: 'An error occurred while processing the request.', status: "FAILED"});
      }
    }
}

