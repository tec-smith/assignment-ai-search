// Import the `zod` library for schema validation.
import { z } from 'zod';

// Define the schema for the type of booking.
export const BookingServiceSchema = z.object({

  // Define the 'serviceType' option as a string with a minimum length of 1 character.
  serviceType: z.string().min(1, { message: 'Please select a search type.' }),
});

// Define the schema for the input of booking.
export const BookingInputSchema = z.string().refine((input) => {
  // Regular expression pattern to match the expected input format
  const pattern = /^([^,]+),\s*([^,]+)\s+from\s+(\d{1,2}(?:st|nd|rd|th)\s+\w+)\s+to\s+(\d{1,2}(?:st|nd|rd|th)\s+\w+)\s+for\s+(\d+)\s+person(s?)$/i;
  
  // Check if the input string matches the specified pattern.
  const match = input.match(pattern);

  // Return true if the input matches the pattern, false otherwise.
  return !!match;
}, {
  // Custom error message displayed when validation fails.
  message: 'Invalid input format. Expected format: "Location, Country from [start date] to [end date] for [number] person(s)"',
}).transform((input) => {
  // Transform function to parse the validated input into ParsedInput object.
  const pattern = /^([^,]+),\s*([^,]+)\s+from\s+(\d{1,2}(?:st|nd|rd|th)\s+\w+)\s+to\s+(\d{1,2}(?:st|nd|rd|th)\s+\w+)\s+for\s+(\d+)\s+person(s?)$/i;
  const match = input.match(pattern);

  if (!match) {
    throw new Error('Invalid input format');
  }

  const [, location, country, startDate, endDate, numOfPersons] = match;

  return {
    location: location.trim(),
    country: country.trim(),
    startDate: startDate.trim(),
    endDate: endDate.trim(),
    numOfPersons: parseInt(numOfPersons, 10),
  };
});

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
