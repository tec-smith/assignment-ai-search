interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

export const geoCoordinates = async (mapLocation: string, gMapsKey: string): Promise<Coordinates> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        mapLocation
      )}&key=${gMapsKey}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;

      return { latitude: lat, longitude: lng };
    } else {
      return { latitude: null, longitude: null }; // Handle error case
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return { latitude: null, longitude: null }; // Handle error case
  }
};

export { Coordinates }; // Export the Coordinates interface.

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
