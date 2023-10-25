import { notification } from 'antd';

const errorNotification = (errorType, errorMessage) => {
  let errorTitle = errorType ? errorType : 'Error Detected';
  let errorDescription = errorMessage
    ? errorMessage
    : 'There was an error, please contact support or try again';

  notification.error({
    message: errorTitle,
    description: errorDescription,
    duration: 10
  });
};

export default errorNotification;
