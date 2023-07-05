# cinex
# Cinema Booking System Documentation

This documentation provides an overview of the Cinex Ticket Cinema Booking System code implementation. It includes information about the code structure, the functionality of different components, and an explanation of how semaphores are used in the system.
It is a simplified ticket booking system for a cinema.The cinema has a limited number of seats available, and multiple customers can try to book
tickets concurrently

## Code Structure

The Cinema Booking System code is organized into the following files:

- `cinema.service.ts`: This file contains the `CinemaService` class, which handles the logic for booking tickets in the cinema.
- `cinema.controller.ts`: This file contains the `CinemaController` class, which handles the HTTP requests and responses for booking tickets.
- `main.ts`: This file contains the `Main` class, which provides utility methods used in the cinema service.
- `cinema.interface.ts`: This file contains the `TicketBooking` interface, which defines the structure of a ticket booking object.
- `cinema.repo.ts`: This file contains the `CinemaRepository` class, which interacts with the Ticket Booking database.
- `enums.options.ts`: This file contains enums that define different options used in the Ticket Booking program.
- `cinema.routes.ts`: This file defines the routes for the Cinema API using the Express Router. It imports the CinemaController class and binds the controller's bookTickets method to the /book route.
- `logger.ts`: This file contains a logger utility class for logging system events.
- `app.ts`: This file is the entry point of the application and sets up the HTTP server.

## CinemaService

The `CinemaService` class is responsible for handling the booking of tickets in the cinema. It provides the following methods:

- `bookTickets`: This method is used to book tickets for a particular show. It takes a `Booking` object as input, which contains information about the screen name, requested seats, showtime, price, movie title, hall number, and booking status. The method calculates the available seats, checks if the requested number of seats is available, calculates the showtime, and creates a booking using the `CinemaRepository` class. It uses a semaphore to control access to the available seats, ensuring that multiple bookings do not exceed the maximum capacity of the cinema.

- `calculateAvailableSeats`: This method calculates the number of available seats by subtracting the current booking count from the maximum capacity.

- `createBooking`: This method creates a booking using the provided ticket payload. It checks if seats are available and sets the booking status accordingly. It then calls the `CinemaRepository` class to create the booking in the database.

- `calculateShowtime`: This method calculates the showtime based on the screen name, hall number, price, and movie title provided in the ticket payload.
## CinemaRepository

The `cinema.repo.ts`:
The mongoose module is imported to work with MongoDB.
The Schema class is imported from mongoose to define the schema for the booked tickets.
The BookingSchema is defined using the Schema class, specifying the structure of a ticket booking object.
The BookedTickets model is created using mongoose.model, associating the BookingSchema with the "BookTicket" collection in the database.

## Semaphore and Concurrency Control

A semaphore is used in the `CinemaService` class to control access to the available seats and prevent overbooking. The semaphore is initialized with the maximum capacity of the cinema. When a booking is made, the semaphore is acquired, reducing the number of available seats. Once the booking is completed, the semaphore is released, allowing other bookings to proceed.

The use of a semaphore ensures that the number of simultaneous bookings does not exceed the maximum capacity of the cinema. If all seats are already booked, the semaphore will block subsequent booking requests until seats become available again.

## CinemaController

The `app.ts`:
The express module is imported to create an Express application.
The dotenv module is imported to load environment variables from a .env file in which the variables used can be found in `.env.example`.
The connectDB function is imported from the `./src/db/connect` module to establish a connection to the MongoDB database.
The cinemaRouter is imported from the `./src/routes/cinema.routes module`, which contains the API routes for the Cinema Booking System.
The Express application is created using express().
The express.json() middleware is used to parse incoming JSON data.
The port variable is set to the value of the process.env.PORT environment variable.
The cinemaRouter is mounted at the `/cinema route`.
A simple route `/api` is defined to respond with a "Hello Ticket Booking!" message.
The connectDB function is called to establish a connection to the database.
The Express application starts listening on the specified port.

The `CinemaController` class handles the HTTP requests and responses related to ticket bookings. It uses an instance of the `CinemaService` class to process the booking requests. The `bookTickets` method in the controller extracts the necessary information from the request payload and passes it to the `CinemaService` for booking. It handles success and error responses accordingly.

The `cinema.routes.ts` file using the Express Router. The `/book` route is associated with the bookTickets method of the CinemaController class. When a POST request is made to this route, it invokes the bookTickets method and handles the response accordingly.


## Semaphore class || Aync-Mutex Library

 Semaphore class or package is a synchronization primitive that allows controlling access to a shared resource by multiple threads or processes. It maintains a count of available resources and provides methods to acquire and release these resources.
The Semaphore class has the following properties and methods:
The `async-mutex `uses the semaphore class:
count: Represents the count of available resources in the semaphore.
waiting: A queue of functions waiting for resources to become available.
`Constructor`
The constructor initializes the count property with the provided count value and initializes the waiting array as an empty array.
acquire() Method
The acquire() method is used to acquire a resource from the semaphore.
If the count is greater than zero, meaning there are available resources, the count is decremented, and the method returns immediately.
If the count is zero, meaning all resources are currently in use, the method adds a new Promise resolver function to the waiting array and awaits the resolution.
When a resource becomes available (i.e., the release() method is called), one of the waiting functions is dequeued and invoked to resolve the promise, allowing the waiting code to proceed.
release() Method
The release() method is used to release a resource back to the semaphore.
It increments the count of available resources.
If there are any functions waiting for resources (i.e., the waiting array is not empty), it dequeues the first function and invokes it to release the waiting code.

## Conclusion

The Cinema Booking System code provides a way to book tickets for different screens in a cinema. It uses semaphores to control access to available seats and prevent overbooking. The code is organized into separate classes for different functionalities, ensuring modularity and maintainability. 
By using semaphores, you can control access to shared resources and manage concurrency in your applications effectively. Understanding how to use and implement semaphores can be valuable in scenarios where resource management and synchronization are crucial.
It provides a complete implementation of the API routes, database connection, and database schema using Express, Mongoose, and MongoDB. By following the documentation, developers can understand the overall code structure and how different components interact to enable ticket bookings and store them in the database.

## Courtesy 

@Abigail-cloud


