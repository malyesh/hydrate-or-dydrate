import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './LoginPage.scss';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const apiBody = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiBody}/auth/login`, {
        email: email,
        password: password,
      });
      setError('');
      setSuccess('you have successfully logged in!');
      let token = response.data.token;
      sessionStorage.setItem('token', token);

      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      setError('email and password do not match');
    }
  };

  return (
    <div className='login'>
      <h1 className='login__title'>Log In</h1>

      {error && <div className='login__error'>{error}</div>}

      {success && <div className='login__success'>{success}</div>}

      <form className='login__form' onSubmit={handleLogin}>
        <div className='login__field'>
          <label className='login__field--label' htmlFor='email'>
            Email
          </label>
          <input
            className='login__field--input'
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter email'
          />
        </div>

        <div className='login__field'>
          <label className='login__field--label' htmlFor='password'>
            Password
          </label>
          <input
            className='login__field--input'
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Enter password'
          />
        </div>

        <button className='login__button' type='submit'>
          log in!
        </button>
      </form>

      <p className='login__signup'>
        Don't have an account yet?{' '}
        <Link className='login__signup--link' to='/'>
          sign up
        </Link>
      </p>
    </div>
  );
}
