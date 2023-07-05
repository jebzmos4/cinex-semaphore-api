
import {v4 as uuidv4} from "uuid";

export default class Main {
    public generateBookingId(): string {
      return uuidv4();
    }
    
}