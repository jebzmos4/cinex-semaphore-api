import { Request, Response } from 'express';
import { CinemaService } from '../service/cinema.service';
import { Booking } from '../screen.type';
import { StatusCodes } from 'http-status-codes';
import log from '../utility/logger';

export class CinemaController{
    private cinemaService = new CinemaService();

    public async bookTickets(req: Request, res: Response): Promise<any> {
      const TicketBooking : Booking = {
        requestedSeats: req.body.requestedSeats,
        showtime : req.body.showtime,
        price : req.body.price,
        movieTitle : req.body.movieTitle,
       status : req.body.status
    }
      try {
          const {booking, bookingId, isBookedOut, isExceedMax }= await this.cinemaService.bookTickets(TicketBooking);
          if (isExceedMax) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Requested number of seats exceeds available seats' })
          else if (isBookedOut) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No available seats' })
          log.info({booking});
          res.status(StatusCodes.ACCEPTED).json({bookingId, message : 'Tickets booked successfully.'})
      } catch (error) {
          log.info(error);
          console.log(error);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "", message: 'An error occurred while processing the request.' });
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
}

