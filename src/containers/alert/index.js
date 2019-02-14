import { PureComponent } from 'react';
import { withToastManager } from 'react-toast-notifications';
import { connect } from 'react-redux';

class Alert extends PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.alert !== this.props.alert) {
      this.displayAlert(this.props.alert);
    }
  }

  /**
   * Trigger message display
   * @param {*} alert Object containing type & message, type can be [success, error, warning, info]
   */
  displayAlert = alert => {
    const alertType = (alert.type || '').toLowerCase() || 'info';
    const content = alert.message;
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

const mapStateToProps = ({ alert }) => ({ alert });

export default withToastManager(connect(mapStateToProps)(Alert));
