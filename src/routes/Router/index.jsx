import { Route, Switch, Redirect } from 'react-router';
import { useAuthContext } from '@contexts/AuthProvider';
import Header from '@components/base/Header';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import CreatePostPage from '@pages/CreatePostPage';
import NotFoundPage from '@pages/NotFoundPage';

const Router = () => {
  const { userToken } = useAuthContext();

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <h1>MainPage</h1>
        </Route>
        <Route exact path="/user/login">
          <LoginPage />
        </Route>
        <Route exact path="/user/signup">
          <SignupPage />
        </Route>
        <Route exact path="/post/create">
          {userToken ? <CreatePostPage /> : <Redirect to="/user/login" />}
        </Route>
        <Route exact path="/post/:id">
          <h1>PostDetailPage</h1>
        </Route>
        <Route exact path="/user/:id">
          {userToken ? <h1>UserInfoPage</h1> : <Redirect to="/user/login" />}
        </Route>
        <Route exact path="/user/:id/following">
          {userToken ? <h1>FollowingPage</h1> : <Redirect to="/user/login" />}
        </Route>
        <Route exact path="/user/:id/follower">
          {userToken ? <h1>FollowerPage</h1> : <Redirect to="/user/login" />}
        </Route>
        <Route exact path="/user/alarm">
          {userToken ? <h1>AlarmPage</h1> : <Redirect to="/user/login" />}
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default Router;
