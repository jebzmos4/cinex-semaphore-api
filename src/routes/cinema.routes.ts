import { Router } from "express";
import { CinemaController } from "../controller/cinema.controller";

const cinemaController = new CinemaController();
const cinemaRouter = Router();

cinemaRouter.post('/book', cinemaController.bookTickets.bind(cinemaController));

cinemaRouter.get('/book', cinemaController.getickets.bind(cinemaController))

cinemaRouter.post('/set-seat/:maxSeat', cinemaController.setMaxSeat.bind(cinemaController))

cinemaRouter.get('/clear', cinemaController.clearBookings.bind(cinemaController))

cinemaRouter.get('/getAvailableSeat', cinemaController.getAvailableSeat.bind(cinemaController))

export default cinemaRouter;