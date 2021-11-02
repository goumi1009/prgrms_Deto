import { Route, Switch, Redirect } from 'react-router';
import { useAuthContext } from '@contexts/AuthProvider';
import Header from '@components/base/Header';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import CreatePostPage from '@pages/CreatePostPage';
import FollowingPage from '@pages/FollowingPage';
import UserPage from '@pages/UserPage';
import NotFoundPage from '@pages/NotFoundPage';
import PostDetailPage from '@pages/PostDetailPage';

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
          <PostDetailPage />
        </Route>
        <Route exact path="/user/:id">
          {userToken ? <UserPage /> : <Redirect to="/user/login" />}
        </Route>
        <Route exact path="/user/:id/following">
          {userToken ? <FollowingPage /> : <Redirect to="/user/login" />}
        </Route>
        <Route exact path="/user/:id/follower">
          {userToken ? <FollowerPage /> : <Redirect to="/user/login" />}
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
