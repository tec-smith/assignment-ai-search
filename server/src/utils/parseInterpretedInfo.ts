// Define the interface for interpreted information.
interface InterpretedInfo {
  city?: string;
  country_code?: string;
  check_in?: string;
  check_out?: string;
  num_of_rooms?: string;
}

/**
 * Parses the cleaned text and extracts relevant information (city, country_code, check_in, check_out, num_of_rooms).
 * @param text The cleaned text from the model response.
 * @returns The parsed interpreted information.
 */
export function parseInterpretedInfoFromText(text: string): InterpretedInfo {
  const parsedInfo: InterpretedInfo = {};

  // Extract city
  const cityMatch = text.match(/"city":\s*"([^"]+)"/);
  if (cityMatch && cityMatch.length > 1) {
    parsedInfo.city = cityMatch[1];
  }

  // Extract country_code
  const countryCodeMatch = text.match(/"country_code":\s*"([^"]+)"/);
  if (countryCodeMatch && countryCodeMatch.length > 1) {
    parsedInfo.country_code = countryCodeMatch[1];
  }

  // Extract check_in date
  const checkInMatch = text.match(/"check_in":\s*"([^"]+)"/);
  if (checkInMatch && checkInMatch.length > 1) {
    parsedInfo.check_in = checkInMatch[1];
  }

  // Extract check_out date
  const checkOutMatch = text.match(/"check_out":\s*"([^"]+)"/);
  if (checkOutMatch && checkOutMatch.length > 1) {
    parsedInfo.check_out = checkOutMatch[1];
  }

  // Extract num_of_rooms
  const numRoomsMatch = text.match(/"num_of_rooms":\s*(\d+)/);
  if (numRoomsMatch && numRoomsMatch.length > 1) {
    parsedInfo.num_of_rooms = numRoomsMatch[1];
  }

  return parsedInfo;
}

export { InterpretedInfo }; // Export the InterpretedInfo interface.

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
