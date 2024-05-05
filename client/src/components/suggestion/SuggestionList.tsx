import React, { useState, useEffect, KeyboardEvent } from 'react';
import SuggestionItem from './SuggestionItem';
import '../../styling/Suggestion.css';

interface SuggestionListProps {
  suggestions: string[]; // Ensure suggestions is of type array of strings
  onSuggestionSelect: (selectedSuggestion: string) => void;
}

export default function SuggestionList({ suggestions, onSuggestionSelect }: SuggestionListProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    setSelectedIndex(-1); // Reset selected index when suggestions change
  }, [suggestions]);

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      onSuggestionSelect(suggestions[selectedIndex]);
    }
  };

  // Check if suggestions is an array with contents other than empty string before mapping over it.
  if (!Array.isArray(suggestions) || suggestions.includes('')) {
    return null; // Return early or render alternative content if suggestions is not an array.
  }

  return (
    <ul className="suggestion-list" onKeyDown={handleKeyDown} tabIndex={0}>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={index}
          suggestion={suggestion}
          isSelected={index === selectedIndex}
          onClick={() => onSuggestionSelect(suggestion)}
        />
      ))}
    </ul>
  );
};

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
