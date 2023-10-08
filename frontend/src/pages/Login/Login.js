import { useLogin } from '../../hooks/useLogin';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login d-flex flex-column gap-4 rounded bg-white" onSubmit={handleSubmit}>
      <h3>Log In</h3>

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
          type="submit"
          disabled={isLoading}
          className="col-12 col-md-auto"
        >
          Log in
        </Button>

        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default Login;
