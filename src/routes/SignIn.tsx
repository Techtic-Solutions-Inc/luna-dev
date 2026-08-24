import React from 'react';
import { SignInForm, RememberMeCheckbox, ForgotPasswordLink } from '../components';

const SignIn: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#FFFFFF', padding: '32px' }}>
      <h1 style={{ fontSize: '38px', fontWeight: 500 }}>Welcome to Agentwise</h1>
      <h2 style={{ fontSize: '16px', fontWeight: 400 }}>Everything you need to create standout real estate content.</h2>
      <SignInForm />
      <RememberMeCheckbox />
      <ForgotPasswordLink href="/forgot-password" />
    </div>
  );
};

export default SignIn;