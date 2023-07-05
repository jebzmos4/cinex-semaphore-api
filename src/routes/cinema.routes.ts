import { Router } from "express";
import { CinemaController } from "../controller/cinema.controller";

const cinemaController = new CinemaController();
const cinemaRouter = Router();

cinemaRouter.post('/book', cinemaController.bookTickets.bind(cinemaController));

cinemaRouter.get('/book', cinemaController.getickets.bind(cinemaController))

export default cinemaRouter;