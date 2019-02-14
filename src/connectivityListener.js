import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';

class ConnectivityListener extends Component {
  state = { isOnline: window ? window.navigator.onLine : false };

  componentDidMount() {
    window.addEventListener('online', this.setOnlineStatus('isOnline', true));
    window.addEventListener('offline', this.setOnlineStatus('isOnline', false));
  }

  setOnlineStatus = (eventName, status) => () => {
    this.setState({ [eventName]: status });
  };

  onlineCallback = () => {
    this.props.toastManager.remove(this.offlineToastId);
    this.offlineToastId = null;
  };

  offlineCallback = id => {
    this.offlineToastId = id;
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { isOnline } = this.state;

    if (prevState.isOnline !== isOnline) {
      return { isOnline };
    }

    return null;
  }

  componentDidUpdate(props, state, snapshot) {
    if (!snapshot) return;

    const { toastManager } = props;
    const { isOnline } = snapshot;

    const content = (
      <div>
        <strong>{isOnline ? 'Online' : 'Offline'}</strong>
        <div>{isOnline ? 'Editing is available again' : 'Changes you make may not be saved'}</div>
      </div>
    );

    const callback = isOnline ? this.onlineCallback : this.offlineCallback;

    toastManager.add(
      content,
      {
        appearance: 'info',
        autoDismiss: isOnline,
      },
      callback
    );
  }
  render() {
    return null;
  }
}

export default withToastManager(ConnectivityListener);
