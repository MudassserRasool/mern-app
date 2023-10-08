import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form className="signup d-flex flex-column gap-4 rounded bg-white" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <TextField
        label="Email address"
        type="email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <Button
          variant="contained"
          color="primary"
          className="col-12 col-md-auto"
          type="submit"
          disabled={isLoading}
        >
          Sign up
        </Button>

        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default Signup;
