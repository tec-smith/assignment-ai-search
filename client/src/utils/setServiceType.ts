import { BookingServiceSchema } from '../schemas';
import { ServiceInputResponse } from '../../../@types';

/**
 * Provides example feedback based on the selected service type.
 * @param value The selected service type as an object with a 'serviceType' property.
 * @returns A response object with example feedback.
 */
export const setServiceType = (value: { serviceType: string }): ServiceInputResponse => {
  const { serviceType } = value;

  // Validate the input against the defined schema.
  const validatedField = BookingServiceSchema.safeParse({ serviceType });

  if (!validatedField.success) {
    throw new Error('Service type was an invalid format.');
  }

  switch (serviceType) {
    case 'Hotels':
      return { example: 'Try; Stockholm, Sverige from 18th to 28th of March for one person.' };
    case 'Flights':
      return { example: 'Try; Stockholm to Copenhagen from 10th to 20th of April for one person.' };
    case 'Trains':
      return { example: 'Try; Stockholm to Uppsala from 7th to 17th of May for one person.' };
    case 'Cars':
      return { example: 'Try; Stockholm, Sverige from 1st to 11th of June for one person.' };
    default:
      throw new Error('Service type must be one of the following: Hotels, Flights, Trains, Cars.');
  }
};

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
