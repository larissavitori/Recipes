import PropTypes from 'prop-types';
import React from 'react';

function NotificationAlert({ aOnClick }) {
  return (
    <button className="notification-alert" onClick={ aOnClick }>
      Link copied!
    </button>
  );
}

NotificationAlert.propTypes = {
  aOnClick: PropTypes.func.isRequired,
};

export default NotificationAlert;
