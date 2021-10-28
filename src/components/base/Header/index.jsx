import styled from 'styled-components';
import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import color from '@styles/color';
import fontType from '@styles/fontType';

const AppHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  max-width: 1120px;
  padding: 0 20px;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid ${color.border};
  position: relative;
`;

const Logo = styled.h1`
  ${fontType.medium};
  color: ${color.green};
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
`;

const SearchWrapper = styled.div`
  display: inline-block;
`;

const SearchForm = styled.form`
  display: ${({ searchOpen }) => (searchOpen ? 'flex' : 'none')};
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${color.white};
  input {
    flex-grow: 1;
    background: #fff;
    border: 0;
  }
`;

const Header = ({ isLogin, isMainPage }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [value, setValue] = useState('');

  const onSearchOpen = () => {
    setSearchOpen(true);
  };

  const onSearchClose = () => {
    setSearchOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchClose();
    setValue('');
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <AppHeaderWrapper>
      <Link to="/">
        <Logo>Deto</Logo>
      </Link>
      <ButtonWrapper>
        <Link to={isLogin ? '/createPost' : '/'}>새포스트</Link>
        {isLogin ? <Link to="/alarm">알림</Link> : undefined}
        {isMainPage ? (
          <SearchWrapper>
            <button type="button" onClick={onSearchOpen}>
              검색
            </button>
            <SearchForm onSubmit={handleSubmit} searchOpen={searchOpen}>
              <button type="button" onClick={onSearchClose}>
                닫기
              </button>
              <input onChange={handleChange} value={value} />
              <button type="submit">검색</button>
            </SearchForm>
          </SearchWrapper>
        ) : undefined}

        <button type="button">메뉴</button>
      </ButtonWrapper>
    </AppHeaderWrapper>
  );
};

Header.defaultProps = {
  isLogin: false,
  isMainPage: false,
};

Header.propTypes = {
  isLogin: PropTypes.bool,
  isMainPage: PropTypes.bool,
};

export default Header;
