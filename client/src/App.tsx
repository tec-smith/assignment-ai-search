import React from 'react';
import SearchBar from './components/SearchBar';
import './styling/App.css';

export default function App(): React.ReactElement {
  const handleQuery = (query: string) => {
    query;
  };

  return (
    <div className={'App'}>
      <div className={'header-container'}>
        <img
          src={'city-city-logo.webp'}
          id={'logo'}
          width={244}
          height={48}
          alt={'CityCity >>'}
        />
        <h2>Booking Service</h2>
      </div>
      <div className={'search-bar-container'}>
        <div className={'input-container'}>
          <SearchBar handleQuery={handleQuery} />
        </div>
      </div>
    </div>
  );
}

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
