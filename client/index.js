import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, HashRouter } from 'react-router-dom';
import App from './components/App';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import RequireAuth from './components/requireAuth';

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
  dataIdFromObject: (obj) => obj.id,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Routes>
          <Route
            path='/*'
            element={
              <App>
                <Routes>
                  <Route
                    path='dashboard'
                    element={<RequireAuth component={<Dashboard />} />}
                  ></Route>
                  <Route
                    path='login'
                    element={
                      <RequireAuth component={<AuthForm type='login' />} />
                    }
                  ></Route>
                  <Route
                    path='signup'
                    element={
                      <RequireAuth component={<AuthForm type='signup' />} />
                    }
                  ></Route>
                  <Route path='*' element={<NotFound />}></Route>
                </Routes>
              </App>
            }
          ></Route>
        </Routes>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
