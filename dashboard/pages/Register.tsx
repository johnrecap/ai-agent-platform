import React from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {
  // Since we are using Google Only Login, registration and login are the same flow.
  // We simply redirect users trying to access the register page to the login page.
  return <Navigate to="/login" replace />;
};

export default Register;