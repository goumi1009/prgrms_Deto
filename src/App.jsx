import GlobalStyle from '@styles/GlobalStyle';
import AuthProvider from '@contexts/AuthProvider';
import Router from '@routes/Router';

const App = () => (
  <AuthProvider>
    <GlobalStyle />
    <Router />
  </AuthProvider>
);

export default App;
