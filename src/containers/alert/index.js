import { PureComponent } from 'react';
import { withToastManager } from 'react-toast-notifications';

import { connect } from 'react-redux';

class Alert extends PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.displayAlert();
    }
  }

  /**
   * Trigger message display
   * @param {*} alert Object containing type & message, type can be [success, error, warning, info]
   */
  displayAlert = () => {
    const alertType = (this.props.type || '').toLowerCase() || 'info';
    const content = this.props.message;
    if (!content) return;

    this.props.toastManager.add(content, {
      appearance: alertType,
      autoDismiss: true,
    });
  };

  render() {
    return null;
  }
}

const mapStateToProps = ({ alert }) => ({ message: alert.message, type: alert.type });

export default withToastManager(connect(mapStateToProps)(Alert));
