import { useState, useEffect, useContext, createContext } from 'react';
import { login, logout, getAuthUser } from '@utils/api';
import { TOKEN_KEY, setItem, getItem, removeItem } from '@utils/storage';
import PropTypes from 'prop-types';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(() => getItem(TOKEN_KEY, ''));
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const authUser = async () => {
      const storageToken = getItem(TOKEN_KEY);
      if (storageToken) {
        const user = await getAuthUser(storageToken);
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
      }
    };
    authUser();
  }, []);

  const handleLogin = async (loginInfo) => {
    try {
      const { user, token } = await login(loginInfo);
      setItem(TOKEN_KEY, token);
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
      setUserToken(true);
      return true;
    } catch (error) {
      alert('잘못된 이메일 또는 비밀번호입니다!');
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      removeItem(TOKEN_KEY);
      setUserToken(false);
      console.log('로그아웃 되었습니다.');
      // 메인페이지로 redirect
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userInfo, userToken, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
