/**
 * Provides feedback to the user if their submission succeeds.
 ***/
import { FaCheckCircle } from 'react-icons/fa';
import '../../styling/Feedback.css';

interface FeedbackProps {
  message?: string;
}

export const SuccessFeedback = ({ message }: FeedbackProps) => {
  if (!message) return null;

  const successIcon = <FaCheckCircle className={'success-icon'} />;

  return (
    <div className={'feedback-container'}>
      {successIcon}
      <div className={'feedback-text'}>{message}</div>
    </div>
  );
};

/***
	@COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
