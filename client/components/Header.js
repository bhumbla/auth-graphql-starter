import React from 'react';
import currentUserQuery from '../queries/CurrentUser';
import { Link } from 'react-router-dom';
import logoutMutation from '../mutations/Logout';
import { useMutation } from '@apollo/client';

const renderButtons = ({ currentUser }, logoutUser) => {
  if (currentUser)
    return (
      <li>
        <a onClick={logoutUser}>Logout</a>
      </li>
    );
  else {
    return (
      <div>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
      </div>
    );
  }
};

const Header = (props) => {
  const [logoutUser] = useMutation(logoutMutation, {
    refetchQueries: [currentUserQuery],
  });

  return (
    <nav>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo left'>
          Home
        </Link>
        <ul className='right'>{renderButtons(props.data, logoutUser)}</ul>
      </div>
    </nav>
  );
};

Header.propTypes = {};

export default Header;
