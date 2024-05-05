export interface CityCity {
  hotelCity: string;
}

export interface GoogleCloud {
  agentModel: string;
  apiEndPoints: any;
  projectIdentity: string;
  projectLocation: string;
}

export interface InterpretedInfo {
  city: string;
  country_code: string;
  check_in: string;
  check_out: string;
  num_of_rooms: string;
}

export interface Metadata {
  title: string;
  description: string;
  keywords: string[];
  authors: any;
}

export interface SendOptions {
  instances: any[];
  parameters?: any;
}

export interface ServiceInputResponse {
  example?: string; // Example message
  failure?: string; // Failure message
  success?: string; // Success message
}
