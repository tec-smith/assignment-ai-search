import React from 'react';
import '../../styling/Suggestion.css';

interface SuggestionItemProps {
  suggestion: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function SuggestionItem({ suggestion, isSelected, onClick }: SuggestionItemProps) {
  return (
    <li className={isSelected ? 'selected' : 'suggestion-item'} onClick={onClick}>
      {suggestion}
    </li>
  );
};

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
