import express from "express";
import dotenv from "dotenv";
import cinemaRouter from "./src/routes/cinema.routes";

dotenv.config()

const app = express();
app.use(express.json());
const port = process.env.PORT;


app.use('/cinema', cinemaRouter);

app.get('/api', (req, res) => {
    res.send('Hello Ticket Booking!');
  });
  


const startApp = async ()=>{
    try {
        app.listen(port, ()=>{
    console.log(`Server is listening on port http://localhost:${port}` );
    
})
    } catch (error) {
        console.log(error);
        
    }
}

startApp();


