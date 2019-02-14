import React from 'react';

const LoadingComponent = ({ isLoading, error }) => {
  try {
    if (isLoading) {
      return (
        <div className='app-loading'>
          <div className='spinner-grow' style={{ width: '5rem', height: '5rem' }} role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      );
    } else if (error) {
      console.error(error);
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};

export default LoadingComponent;
