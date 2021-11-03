import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@contexts/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import color from '@styles/color';
import Icon from '@components/base/Icon';
import Text from '@components/base/Text';
import ProfileBox from '@components/base/ProfileBox';
import Logo from '@components/base/Logo';

const AppHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: 1120px;
  padding: 0 20px;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid ${color.border};
  background: ${color.white};
`;

const HeaderLogo = styled.h1`
  width: 72px;
  img {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  &:hover {
    background-color: ${color.border};
    border-radius: 50%;
  }
`;

const IconLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  &:hover {
    background-color: ${color.border};
    border-radius: 50%;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  height: 100%;
  z-index: 10;
`;

const SearchForm = styled.form`
  display: ${({ searchOpen }) => (searchOpen ? 'flex' : 'none')};
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background: ${color.white};
  input {
    flex-grow: 1;
    background: #fff;
    border: 0;
  }
`;

const DropMenu = styled.div`
  display: ${({ showMenu }) => (showMenu ? 'block' : 'none')};
  position: absolute;
  right: 20px;
  top: 45px;
  padding: 16px;
  background-color: ${color.white};
  border-radius: 4px;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;
  opacity: ${({ showMenu }) => (showMenu ? 1 : 0)};
  transition: all 0.3s ease-in 0.1s;

  a,
  button {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`;

const ColorButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 40px;
  border-radius: 4px;
  background: ${color.greenLight};

  span {
    display: block;
    margin-left: 8px;
  }

  &:hover {
    background-color: ${color.green};
  }
`;

const BorderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 40px;
  border-radius: 4px;
  background-color: ${color.white};
  border: 2px solid ${color.greenLight};

  span {
    display: block;
    margin-left: 8px;
  }

  &:hover {
    border-color: ${color.green};
    span {
      color: ${color.green};
    }
  }
`;
const BorderLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 40px;
  border-radius: 4px;
  background-color: ${color.white};
  border: 2px solid ${color.greenLight};

  span {
    display: block;
    margin-left: 8px;
  }

  &:hover {
    border-color: ${color.green};
    span {
      color: ${color.green};
    }
  }
`;

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [value, setValue] = useState('');
  const { userToken, handleLogout, userInfo } = useAuthContext();
  const [isMainPage, setIsMainPage] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(
    () =>
      location.pathname === '/' ? setIsMainPage(true) : setIsMainPage(false),
    [location],
  );

  const onSearchOpen = () => {
    setSearchOpen(true);
  };

  const onSearchClose = () => {
    setValue('');
    setSearchOpen(false);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchClose();
  };

  const handleLogoutClick = () => {
    handleLogout();
    closeMenu();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <AppHeaderWrapper>
      <HeaderLogo>
        <Link to="/">
          <Logo />
        </Link>
      </HeaderLogo>
      <ButtonWrapper>
        <IconLink to={userToken ? '/post/create' : '/user/login'}>
          <Icon name="plus-square" color={color.secondary} />
        </IconLink>
        {userToken ? (
          <IconLink to="/user/notification">
            <Icon name="bell" color={color.secondary} />
          </IconLink>
        ) : undefined}
        {isMainPage ? (
          <SearchWrapper>
            <IconButton type="button" onClick={onSearchOpen}>
              <Icon name="search" color={color.secondary} />
            </IconButton>
            <SearchForm onSubmit={handleSubmit} searchOpen={searchOpen}>
              <IconButton type="button" onClick={onSearchClose}>
                <Icon name="arrow-left" color={color.secondary} />
              </IconButton>
              <input onChange={handleChange} value={value} />
              <IconButton type="submit">
                <Icon name="search" color={color.green} />
              </IconButton>
            </SearchForm>
          </SearchWrapper>
        ) : undefined}
        <IconButton
          type="button"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <Icon name="menu" color={color.green} />
        </IconButton>
        <DropMenu showMenu={showMenu}>
          {userToken ? (
            <>
              <ColorButton to={`/user/${userInfo.userId}`} onClick={closeMenu}>
                <ProfileBox
                  size={24}
                  src={userInfo.userProfile}
                  content={userInfo.userName}
                  color="white"
                  strong
                />
              </ColorButton>
              <BorderButton type="button" onClick={handleLogoutClick}>
                <Icon
                  name="log-out"
                  color={color.greenLight}
                  hoverColor={color.green}
                />
                <Text content="로그아웃" color="greenLight" strong />
              </BorderButton>
            </>
          ) : (
            <>
              <BorderLink to="/user/login" onClick={closeMenu}>
                <Icon
                  name="log-in"
                  color={color.greenLight}
                  hoverColor={color.green}
                />
                <Text content="로그인" color="greenLight" strong />
              </BorderLink>
              <ColorButton to="/user/signup" onClick={closeMenu}>
                <Icon name="user-plus" color={color.white} />
                <Text content="회원가입" color="white" strong />
              </ColorButton>
            </>
          )}
        </DropMenu>
      </ButtonWrapper>
    </AppHeaderWrapper>
  );
};

export default Header;
