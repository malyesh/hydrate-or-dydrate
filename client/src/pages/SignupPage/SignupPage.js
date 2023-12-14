import { useState } from 'react';
import { Link } from 'react-router-dom';
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSignup = (event) => {
    event.preventDefault();
    if (event.target.password.value === event.target.confirm_password.value) {
      let userInput = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      };
      console.log(userInput);
    }
  };

  return (
    <div className='signup'>
      <h1 className='signup__title'>Sign Up</h1>

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
