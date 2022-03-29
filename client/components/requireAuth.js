import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserQuery from '../queries/CurrentUser';

const RequireAuth = (props) => {
  const { component } = props;
  let navigate = useNavigate();
  let { loading, error, data } = useQuery(CurrentUserQuery);
  useEffect(() => {
    if (!loading && (!data || !data.currentUser)) navigate('/login');
    else if (error) navigate('/404');
    else navigate('/dashboard');
  }, [loading, error, data]);
  return component;
};

export default RequireAuth;
