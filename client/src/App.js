import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import PublicProfile from './pages/PublicProfile';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          {/* ... other routes */}
          <Route 
            path="/profile" 
            element={Auth.loggedIn() ? <ProfilePage /> : <Navigate to="/login" />} 
          />
          <Route path="/profile/:username" element={<PublicProfile />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}