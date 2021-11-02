import { Route, Switch, Redirect } from 'react-router';
import { useAuthContext } from '@contexts/AuthProvider';
import Header from '@components/base/Header';
import MainPage from '@pages/MainPage';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import CreatePostPage from '@pages/CreatePostPage';
import PostDetailPage from '@pages/PostDetailPage';
import UserPage from '@pages/UserPage';
import NotificationPage from '@pages/NotificationPage';
import FollowerPage from '@pages/FollowerPage';
import FollowingPage from '@pages/FollowingPage';
import NotFoundPage from '@pages/NotFoundPage';

const Router = () => {
  const { userToken } = useAuthContext();

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Header />
          <MainPage />
        </Route>
        <Route exact path="/user/login">
          <LoginPage />
        </Route>
        <Route exact path="/user/signup">
          <SignupPage />
        </Route>
        <Route exact path="/post/create">
          <Header />
          {userToken ? <CreatePostPage /> : <Redirect to="/user/login" />}
        </Route>
        <Route exact path="/post/:id">
          <Header />
          <PostDetailPage />
        </Route>
        <Route exact path="/user/notification">
          <Header />
          {userToken ? <NotificationPage /> : <Redirect to="/user/login" />}
        </Route>
        <Route exact path="/user/:id">
          <Header />
          {userToken ? <UserPage /> : <Redirect to="/user/login" />}
        </Route>
        <Route exact path="/user/:id/following">
          <Header />
          {userToken ? <FollowingPage /> : <Redirect to="/user/login" />}
        </Route>
        <Route exact path="/user/:id/follower">
          <Header />
          {userToken ? <FollowerPage /> : <Redirect to="/user/login" />}
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default Router;
