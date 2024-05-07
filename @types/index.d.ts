/**
 * 
 */
export interface CityCity {
  hotelCity: string;
}

/**
 * 
 */
export interface Coordinates {
  latitude: number | null;
  longitude: number | null;
  country_code: string | null;
}

/**
 * 
 */
export interface InterpretedInfo {
  city?: string;
  country_code?: string;
  check_in?: string;
  check_out?: string;
  num_of_rooms?: string;
}

/**
 * 
 */
export interface InterpretedResponse {
  city?: string;
  country_code?: string;
  check_in?: string;
  check_out?: string;
  num_of_rooms?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * 
 */
export interface Metadata {
  title: string;
  description: string;
  keywords: string[];
  authors: any;
}

/**
 * 
 */
export interface ParsedInput {
  location?: string;
  start_date?: string;
  end_date?: string;
  num_of_guests?: number;
  num_of_rooms?: number;
}

/**
 * 
 */
export interface SearchBarProps {
  handleQuery: (query: string) => void;
}

/**
 * 
 */
export interface SearchResultProps {
  searchResult: InterpretedResponse;
}

/**
 * 
 */
export interface ServiceInputResponse {
  example?: string;
  failure?: string;
  success?: string;
}

/**
 * 
 */
export interface writeOptions {
  modelId: string;
  response: any;
}

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
