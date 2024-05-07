import { Coordinates } from '../../../@types';

export const geoCoordinates = async (mapLocation: string, gMapsKey: string): Promise<Coordinates> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        mapLocation
      )}&key=${gMapsKey}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const { lat, lng } = result.geometry.location;

      let countryCode = null;
      for (const component of result.address_components) {
        if (component.types.includes('country')) {
          countryCode = component.short_name;
          break;
        }
      }

      return { latitude: lat, longitude: lng, country_code: countryCode };
    } else {
      return { latitude: null, longitude: null, country_code: null };
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return { latitude: null, longitude: null, country_code: null };
  }
};

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
