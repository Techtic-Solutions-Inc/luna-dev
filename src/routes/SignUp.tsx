import React from 'react';
import { SignUpForm, TermsCheckbox, SignInLink } from '../components';

const SignUp: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#FFFFFF', padding: '30px' }}>
      <h1 style={{ fontSize: '38px', fontWeight: 500 }}>Great Marketing Made Easier. Specifically for Agents</h1>
      <h2 style={{ fontSize: '16px', fontWeight: 400 }}>Create your account today</h2>
      <SignUpForm />
      <TermsCheckbox />
      <SignInLink href="/signin" />
    </div>
  );
};

export default SignUp;