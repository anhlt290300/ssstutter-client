import React from "react";
import PropTypes from "prop-types";

const ResetPassword = ({ email, reset }) => {
  return <div>page</div>;
};

ResetPassword.propTypes = {
  email: PropTypes.string.isRequired,
  reset: PropTypes.bool,
};

export default ResetPassword;
