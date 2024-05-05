/**
 * Provides feedback to the user if their submission needs to be improved.
 ***/
import { FaInfoCircle } from 'react-icons/fa';
import '../../styling/Feedback.css';

interface FeedbackProps {
  message?: string;
}

export const ExampleFeedback = ({ message }: FeedbackProps) => {
  if (!message) return null;

  const exampleIcon = <FaInfoCircle className={'example-icon'} />;

  return (
    <div className={'feedback-container'}>
      {exampleIcon}
      <div className={'feedback-text'}>{message}</div>
    </div>
  );
};

/***
	@COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
