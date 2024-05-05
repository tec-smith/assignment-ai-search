interface ParsedInput {
  location: string;
  startDate: string;
  endDate: string;
  guests: number;
  rooms: number;
}

/**
 * Parses user input string into structured data.
 * @param input The user input string to parse.
 * @returns Parsed input data if successful, otherwise null.
 */
export const parseInput = (input: string): ParsedInput | null => {
  // Split the input string into parts based on spaces
  const parts = input.trim().split(' ');
  
  // Ensure the input string has at least 5 parts (location, datesOfStay, guestsRooms)
  if (parts.length < 5) {
    // Input doesn't match expected format
    return null;
  }

  // Extract the location from the beginning of the input
  const location = parts.slice(0, -4).join(' ');

  // Extract datesOfStay and guestsRooms from the last four parts
  const datesOfStay = parts.slice(-4).join(' ');
  const guestsRooms = parts[parts.length - 2] + ' and ' + parts[parts.length - 1];

  // Regular expression to match and extract startDay, endDay, and month from datesOfStay
  const datesRegex = /(\d{1,2})(?:st|nd|rd|th)?\s+to\s+(\d{1,2})(?:st|nd|rd|th)?\s+of\s+([a-zA-Z]+)/i;
  const dateMatch = datesOfStay.match(datesRegex);

  if (!dateMatch) {
    // Invalid dates format
    return null;
  }

  const [, startDay, endDay, month] = dateMatch;
  const normalizedMonth = month.toLowerCase();

  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  // Map of month names to month numbers (e.g., 'january' => '01')
  const monthMap: Record<string, string> = {
    january: '01', february: '02', march: '03', april: '04',
    may: '05', june: '06', july: '07', august: '08',
    september: '09', october: '10', november: '11', december: '12',
  };

  // Construct startDate and endDate using the current year and extracted day/month
  const startDate = `${currentYear}-${monthMap[normalizedMonth] || '00'}-${startDay.padStart(2, '0')}`;
  const endDate = `${currentYear}-${monthMap[normalizedMonth] || '00'}-${endDay.padStart(2, '0')}`;

  // Parse guests and rooms from guestsRooms
  const guests = parseInt(guestsRooms.split(' and ')[0].trim(), 10) || 1;
  const rooms = parseInt(guestsRooms.split(' and ')[1].trim(), 10) || 1;

  // Return the parsed input data as a structured object
  return {
    location: location.trim(),
    startDate,
    endDate,
    guests,
    rooms,
  };
};
