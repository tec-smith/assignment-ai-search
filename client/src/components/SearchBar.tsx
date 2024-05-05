import React, { useEffect, useState, useTransition } from 'react';
import { FaSearch } from 'react-icons/fa';

import { BookingInputSchema, BookingServiceSchema } from '../schemas';
import { ExampleFeedback } from '../components/feedback/ExampleFeedback';
import { FailureFeedback } from '../components/feedback/FailureFeedback';
import { SuccessFeedback } from '../components/feedback/SuccessFeedback';
import { parseInput } from '../utils/parseInput';
import { setServiceType } from '../utils/setServiceType';
import SearchResult from './SearchResult';
import SuggestionList from './suggestion/SuggestionList';

import '../styling/SearchBar.css';

interface InterpretedResponse {
  city?: string;
  country_code?: string;
  check_in?: string;
  check_out?: string;
  num_of_rooms?: string;
  latitude?: number;
  longitude?: number;
}

interface SearchBarProps {
  handleQuery: (query: string) => void;
}

const cCHotels = 'https://test.citycity.se/api/v2/hotel/city';

const SearchBar: React.FC<SearchBarProps> = ({ handleQuery }) => {
  // State variables for form submission.
  const [example, setExample] = useState<string | undefined>('');
  const [failure, setFailure] = useState<string | undefined>('');
  const [isPending, setIsPending] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<InterpretedResponse | null>(
    null
  );
  const [searchValue, setSearchValue] = useState('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (failure) {
      const timeout = setTimeout(() => {
        setFailure(undefined);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [failure]);

  // Fetch location suggestions based on the initial input value.
  const fetchSuggestions = async (value: string) => {
    try {
      // Fetch data from the CityCity API.
      const response = await fetch(`${cCHotels}/${value}`);

      // Check if the response is successful.
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      // Parse the JSON response.
      const json = await response.json();

      // Filter JSON data to only include cities and country names.
      const filteredSuggestions = json.filter((city: any) =>
        city.Name.toLowerCase().includes(value.toLowerCase())
      );

      // Map filtered suggestions to a formatted string containing city and country.
      const formattedSuggestions = filteredSuggestions.map((city: any) => {
        const { Name } = city;
        const [location, country] = Name.split(',').map((item: string) =>
          item.trim()
        );
        return `${location}, ${country}`;
      });

      // Update component state with formatted suggestions.
      setSuggestions(formattedSuggestions);
    } catch (error) {
      // Handle any errors that occurred during the fetch.
      console.error('Error fetching suggestions:', error);
    }
  };

  // Reset the form state.
  const handleFormReset = () => {
    setSuggestions([]);
    setSearchValue('');
  };

const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsPending(true);

  // Uncomment and use input validation logic if needed
  // const parsedData = BookingInputSchema.parse(parseInput(searchValue));
  // if (!parsedData) {
  //   setExample(
  //     'e.g. "Stockholm, Sverige from 28th to 29th of March for one person".'
  //   );
  //   return;
  // }

  try {

    // Send the user input to the backend for interpretation.
    const response = await fetch('http://localhost:3001/api/interpret', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchValue }),
    });

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error('Failed to interpret input');
    }

    // Parse the JSON response.
    const interpretedInfo: InterpretedResponse = await response.json();
    setResponseData(interpretedInfo);

    // Construct the redirect URL using responseData.
    const { country_code, latitude, longitude, check_in, check_out } = interpretedInfo;
    const url = `https://test.citycity.se/hotels/search/${country_code}/${latitude}/${longitude}/${check_in}/${check_out}/1/1`;

    // Set the redirectUrl state with the constructed URL.
    setRedirectUrl(url);

    // Redirect to the constructed URL after waiting (10 seconds delay).
    setTimeout(() => {
      window.location.href = url;
    }, 10000);

    // Reset the form.
    handleFormReset();
  } catch (error) {
    console.error('Error interpreting input:', error);
  } finally {
    // Set isPending back to false regardless of success or failure.
    setIsPending(false);
  }
};


  // Handle input change.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    fetchSuggestions(value);
  };

  // Handle suggestion selection.
  const handleSuggestionSelect = (selectedSuggestion: string) => {
    // Log the selected suggestion for debugging purposes.
    console.log('Selected suggestion:', selectedSuggestion);

    // Update the search input with the selected suggestion.
    setSearchValue(selectedSuggestion);

    // Clear suggestions after selection.
    setSuggestions([]);

    // Perform query or other actions with selected suggestion.
    handleQuery(selectedSuggestion);
  };

  // Handle service type change.
  const handleTypeChange = async (serviceType: string) => {
    setIsPending(true);

    try {
      // Prepare the data object to pass to the service type function.
      const value = { serviceType };

      // Call the service type function asynchronously.
      const data = await setServiceType(value);

      // Update state variables based on the response data.
      setExample(data?.example);
      setFailure(data?.failure);
      setSuccess(data?.success);

      handleFormReset();
    } catch (error) {
      console.error('Error handling type change:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      className={'search-form'}
      id={'search'}
      name={'search'}
      onSubmit={handleFormSubmit}
    >
      <div className={'input-wrapper'}>
        <FaSearch id={'search-icon'} />
        {/* Select service type */}
        <select
          className={'service-type'}
          defaultValue={'Hotels'}
          disabled={isPending}
          form={'search'}
          id={'service-type'}
          name={'service-type'}
          onChange={(e) => handleTypeChange(e.target.value)}
          required={true}
        >
          <option value={'Hotels'}>Hotels</option>
          <option value={'Trains'} disabled={true}>
            Trains
          </option>
          <option value={'Flights'}>Flights</option>
          <option value={'Cars'} disabled={true}>
            Cars
          </option>
        </select>
        <div className={'input-container'}>
          {/* Search input */}
          <input
            autoComplete={'off'}
            autoFocus
            disabled={isPending}
            form={'search'}
            id={'search-enquiry'}
            name={'search-enquiry'}
            onChange={handleInputChange}
            placeholder={"Where're you going?"}
            required
            title={'Input a location, dates of stay and number of guests.'}
            type={'text'}
            value={searchValue}
          />
          {/* Location suggestions */}
          {suggestions.length > 0 && (
            <SuggestionList
              suggestions={suggestions}
              onSuggestionSelect={handleSuggestionSelect}
            />
          )}
        </div>
        <button
          disabled={isPending}
          form={'search'}
          id={'submit-query'}
          name={'submit-query'}
          type={'submit'}
        >
          {isPending ? '' : '>>'}
        </button>
      </div>
      {/* Feedback messages */}
      <ExampleFeedback message={example} />
      <FailureFeedback message={failure} />
      <SuccessFeedback message={success} />
      {/* Redirect message */}
      {redirectUrl && (
        <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: 'red' }}>
          You will be redirected to the search page in ten seconds...
        </p>
      )}
      {/* Search result */}
      {responseData && <SearchResult searchResult={responseData} />}
    </form>
  );
};

export default SearchBar;

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
