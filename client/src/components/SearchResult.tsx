import React from 'react';

import { SearchResultProps } from '../../../@types';

import '../styling/Interpreted.css';

const SearchResult: React.FC<SearchResultProps> = ({ searchResult }) => {
  return (
    <div className="response-container">
      <h3>Response:</h3>
      <p>City: {searchResult.city}</p>
      <p>Country Code: {searchResult.country_code}</p>
      <p>Check-In: {searchResult.check_in}</p>
      <p>Check-Out: {searchResult.check_out}</p>
      {searchResult.latitude && searchResult.longitude && (
        <p>
          Coordinates: ({searchResult.latitude}, {searchResult.longitude})
        </p>
      )}
      <p>Number of Rooms: {searchResult.num_of_rooms || '1'}</p>
    </div>
  );
};

export default SearchResult;

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
