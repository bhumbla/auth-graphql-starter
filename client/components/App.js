import React from 'react';
import Header from './Header';
import { useQuery } from '@apollo/client';
import currentUserQuery from '../queries/CurrentUser';
import Loading from './Loading';

const App = (props) => {
  const { loading, error, data } = useQuery(currentUserQuery);
  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <div className='container'>
      <Header data={data} />
      {props.children}
    </div>
  );
};

App.propTypes = {};

export default App;
