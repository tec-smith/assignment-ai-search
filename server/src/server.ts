import express, { Request, Response } from 'express';
import cors from 'cors';
import { Coordinates, InterpretedInfo } from "../../@types";
import { inputInterpreter } from './utils/inputInterpreter';
import { parseInterpretedInfoFromText } from './utils/parseInterpretedInfo';
import { geoCoordinates } from './utils/geoCoordinates';

// Initialize Express app.
const app = express();
const PORT = process.env.PORT || 3001;
const GMAPS_KEY = process.env.GOOGLES_MAPS_KEY || '';

// Use JSON middleware to parse request bodies.
app.use(express.json());

// Middleware to allow cross-origin requests (CORS).
app.use(cors());

// Route to handle interpretation of user input.
app.post('/api/interpret', async (req: Request<any, any, { searchValue: string }>, res: Response) => {
  const { searchValue } = req.body;

  try {
    // Make the interpretation request.
    const interpretedInfoString = await inputInterpreter(searchValue);

    // Parse interpretedInfo from the cleaned text.
    const interpretedInfo: InterpretedInfo = parseInterpretedInfoFromText(interpretedInfoString);

    // Extract information from interpretedInfo to get a latitude and longitude of the location.
    const { city, country_code } = interpretedInfo;

    // Fetch geographic coordinates using 'city' and 'country_code'.
    if (city && country_code) {
      const location = `${city}, ${country_code}`;
      const coordinates: Coordinates = await geoCoordinates(location, GMAPS_KEY);

      // Ensure the response is a plain object.
      const response = {
        city: interpretedInfo.city,
        country_code: coordinates.country_code,
        check_in: interpretedInfo.check_in,
        check_out: interpretedInfo.check_out,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        num_of_rooms: interpretedInfo.num_of_rooms
      };

      // Return the JSON response containing interpretedInfo and coordinates.
      res.status(200).json(response);
    } else {
      // Handle case where city is not found in interpretedInfo.
      res.status(404).json({ error: 'Coudn\'t locate the destination.' });
    }
  } catch (error) {
    console.error('Error interpreting input:', error);
    res.status(500).json({ error: 'Failed to interpret input.' });
  }
});

// Start the Express server.
app.listen(PORT, () => {
  console.log(`I am listening on port ${PORT}`);
});

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
