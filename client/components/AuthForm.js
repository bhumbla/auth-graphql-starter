import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import loginMutation from '../mutations/Login';
import signupMutation from '../mutations/Signup';
import CurrentUserQuery from '../queries/CurrentUser';

const onSubmit = (e, data, action) => {
  e.preventDefault();
  const { email, password } = data;
  action({ variables: { email, password } });
};

const AuthForm = (props) => {
  const [state, setState] = useState({ email: '', password: '' });

  const [loginUser, { error: loginErrors }] = useMutation(loginMutation, {
    refetchQueries: [CurrentUserQuery],
  });

  const [signupUser, { error: signupErrors }] = useMutation(signupMutation, {
    refetchQueries: [CurrentUserQuery],
  });
  let errors = [];
  if (loginErrors) {
    errors = loginErrors.graphQLErrors.map((err) => err.message);
  }
  if (signupErrors) {
    errors = signupErrors.graphQLErrors.map((err) => err.message);
  }
  return (
    <div>
      <h3>{props.type === 'login' ? `Login` : `Signup`}</h3>
      <div className='row'>
        <form
          className='form col s6'
          onSubmit={(e) =>
            props.type === 'login'
              ? onSubmit(e, state, loginUser)
              : onSubmit(e, state, signupUser)
          }
        >
          <div className='input-field'>
            <label htmlFor='email' className='active'>
              Email:{' '}
            </label>
            <input
              id='email'
              type='email'
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='password' className='active'>
              Password:{' '}
            </label>
            <input
              id='password'
              type='password'
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </div>
          <div className='errors'>
            {errors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
          <button className='btn'>Submit</button>
        </form>
      </div>
    </div>
  );
};

AuthForm.propTypes = {};

export default AuthForm;
