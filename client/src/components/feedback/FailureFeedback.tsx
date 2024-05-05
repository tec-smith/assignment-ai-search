/**
 * Provides feedback to the user if their submission fails.
 ***/
import { FaExclamationTriangle } from 'react-icons/fa';
import '../../styling/Feedback.css';

interface FeedbackProps {
  message?: string;
}

export const FailureFeedback = ({ message }: FeedbackProps) => {
  if (!message) return null;

  const failureIcon = <FaExclamationTriangle className={'failure-icon'} />;

  return (
    <div className={'feedback-container'}>
      {failureIcon}
      <div className={'feedback-text'}>{message}</div>
    </div>
  );
};

/***
	@COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
