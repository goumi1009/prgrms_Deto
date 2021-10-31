import { Route, Switch } from 'react-router';
import Header from '@components/base/Header';
import GlobalStyle from '@styles/GlobalStyle';
import AuthProvider from '@contexts/AuthProvider';
import LoginPage from '@pages/LoginPage';

const App = () => (
  <div>
    <AuthProvider>
      <GlobalStyle />
      <Header isSearch isLogin />
      <Switch>
        <Route path="/" exact>
          <h1>MainPage</h1>
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/createPost">
          <h1>포스트 생성</h1>
        </Route>
        <Route path="/alarm">
          <h1>알림</h1>
        </Route>
        <Route path="/:postId">
          <h1>포스트 상세</h1>
        </Route>
      </Switch>
    </AuthProvider>
  </div>
);

export default App;
