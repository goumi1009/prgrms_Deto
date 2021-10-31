import { useState, useContext, createContext } from 'react';
import { login, logout } from '@utils/api';
import { setItem, getItem, removeItem } from '@utils/storage';
import PropTypes from 'prop-types';

const USER_TOKEN = 'token';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => getItem(USER_TOKEN, ''));
  const [userInfo, setUserInfo] = useState({
    userId: 'user._id',
    userProfile: 'user._id',
    userName: 'user._id',
    likes: 'user._id',
    comments: 'user._id',
    followers: 'user._id',
    following: 'user._id',
    email: 'user._id',
    isOnline: 'user._id',
  });

  const handleLogin = async (loginInfo) => {
    try {
      const { user, token } = await login(loginInfo);
      setItem(USER_TOKEN, token);
      setUserInfo({
        userId: user._id,
        userProfile: user.image,
        userName: user.username,
        likes: user.likes,
        comments: user.comments,
        followers: user.followers,
        following: user.following,
        email: user.email,
        isOnline: user.isOnline,
      });
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      alert('잘못된 이메일 또는 비밀번호입니다!');
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      removeItem(USER_TOKEN);
      setIsLoggedIn(false);
      console.log('로그아웃 되었습니다.');
      // 메인페이지로 redirect
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userInfo, isLoggedIn, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
