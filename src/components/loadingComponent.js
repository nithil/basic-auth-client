import React from 'react';
import { Button } from 'react-bootstrap';

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
      return (
        <div>
          <center>Sorry, there was a problem loading the page</center>
          <br />
          <center>
            <Button primary compact onClick={() => window.location.reload()}>
              Reload
            </Button>
          </center>
        </div>
      );
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};

export default LoadingComponent;
