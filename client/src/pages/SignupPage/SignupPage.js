import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.scss';

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
};

export default function SignupPage() {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const apiBody = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (
      !values.first_name ||
      !values.last_name ||
      !values.email ||
      !values.password ||
      !values.confirm_password
    ) {
      setError('please fill out all form fields!');
      return;
    }
    if (event.target.password.value === event.target.confirm_password.value) {
      setError('');
      let userInput = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      };
      try {
        await axios.post(`${apiBody}/auth/register`, userInput);
        setSuccess('you have successfully been registered!');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError('password and password confirmation must match');
      return;
    }
  };

  return (
    <div className='signup'>
      <h1 className='signup__title'>Sign Up</h1>

      {error && <div className='signup__error'></div>}

      {success && <div className='signup__success'></div>}

      <form className='signup__form' onSubmit={handleSignup}>
        <div className='signup__field'>
          <label className='signup__field--label' htmlFor='first_name'>
            First Name
          </label>
          <input
            className='signup__field--input'
            type='text'
            id='first_name'
            name='first_name'
            value={values.first_name}
            onChange={handleInputChange}
            placeholder='Enter first name'
          />
        </div>

        <div className='signup__field'>
          <label className='signup__field--label' htmlFor='last_name'>
            Last Name
          </label>
          <input
            className='signup__field--input'
            type='text'
            id='last_name'
            name='last_name'
            value={values.last_name}
            onChange={handleInputChange}
            placeholder='Enter last name'
          />
        </div>

        <div className='signup__field'>
          <label className='signup__field--label' htmlFor='email'>
            Email
          </label>
          <input
            className='signup__field--input'
            type='email'
            id='email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
            placeholder='Enter email'
          />
        </div>

        <div className='signup__field'>
          <label className='signup__field--label' htmlFor='password'>
            Password
          </label>
          <input
            className='signup__field--input'
            type='password'
            id='password'
            name='password'
            value={values.password}
            onChange={handleInputChange}
            placeholder='Create password'
          />
        </div>

        <div className='signup__field'>
          <label className='signup__field--label' htmlFor='confirm_password'>
            Confirm Password
          </label>
          <input
            className='signup__field--input'
            type='password'
            id='confirm_password'
            name='confirm_password'
            value={values.confirm_password}
            onChange={handleInputChange}
            placeholder='Enter password again'
          />
        </div>

        <button className='signup__button' type='submit'>
          sign up!
        </button>
      </form>

      <p className='signup__login'>
        Already have an account?{' '}
        <Link className='signup__login--link' to='/login'>
          log in
        </Link>
      </p>
    </div>
  );
}
