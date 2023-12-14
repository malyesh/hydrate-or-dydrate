import { Link } from 'react-router-dom';
import { useState } from 'react';
import './LoginPage.scss';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <div className='login'>
      <h1 className='login__title'>Log In</h1>

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
