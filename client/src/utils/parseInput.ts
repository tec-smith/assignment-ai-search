import { ParsedInput } from '../../../@types';

/**
 * Parses user input string into structured data.
 * @param input The user input string to parse.
 * @returns Parsed input data if successful, otherwise null.
 */
export const parseInput = (input: string): ParsedInput | null => {
  // Define the regular expression pattern to capture location, dates, and guests.
  const regex = /^([^\d]+) from (\d{1,2})(?:st|nd|rd|th)? to (\d{1,2})(?:st|nd|rd|th)? of ([a-zA-Z]+) for (\w+)/i;
  const match = input.match(regex);

  if (!match) {
    // Input doesn't match expected format.
    return null;
  }

  const [, location, startDay, endDay, month, guests] = match;
  const normalizedMonth = month.toLowerCase();

  // Get the current year dynamically.
  const currentYear = new Date().getFullYear();

  // Map of month names to month numbers (e.g., 'january' => '01').
  const monthMap: Record<string, string> = {
    january: '01', february: '02', march: '03', april: '04',
    may: '05', june: '06', july: '07', august: '08',
    september: '09', october: '10', november: '11', december: '12',
  };

  // Construct startDate and endDate using the current year and extracted day/month.
  const start_date = `${currentYear}-${monthMap[normalizedMonth] || '00'}-${startDay.padStart(2, '0')}`;
  const end_date = `${currentYear}-${monthMap[normalizedMonth] || '00'}-${endDay.padStart(2, '0')}`;

  // Parse number of guests (assuming 'one person' as default).
  const num_of_guests = guests.toLowerCase().includes('one') ? 1 : parseInt(guests, 10) || 1;

  // Return the parsed input data as a structured object.
  return {
    location: location.trim(),
    start_date,
    end_date,
    num_of_guests,
    num_of_rooms: 1, // Assuming single room for one person
  };
};
