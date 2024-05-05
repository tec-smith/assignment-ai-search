import * as z from 'zod';
import { BookingServiceSchema } from '../schemas';
import { parseInput } from '../utils/parseInput';
import { ServiceInputResponse } from '../../../@types';

/**
 * Processes user input for the specified service type and handles form submission.
 * @param value The selected service type.
 * @param input The user input string.
 * @returns A response object based on the input and service type.
 */
export const serviceBooking = async (value: z.infer<typeof BookingServiceSchema>, input: string): Promise<ServiceInputResponse> => {
  try {
    // Validate the input against the service schema.
    const validatedField = BookingServiceSchema.safeParse(value);

    if (!validatedField.success) {
      return { failure: 'Unable to validate booking type, please try again.' };
    }

    const { serviceType } = validatedField.data;

    // Parse the input to extract relevant information.
    const parsedData = parseInput(input);

    // Additional logic based on the selected service type (if needed)
    // Example: Call corresponding API based on serviceType

    // Combine feedback messages with parsed data if necessary.
    return { success: 'Proceeding to search results, please wait...' };
  } catch (error) {
    console.error('Error processing service input:', error);
    throw new Error('Failed to process service input.');
  }
};

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
