import styled from 'styled-components';
import { useEffect, useMemo } from 'react';
import ReactDom from 'react-dom';
import { PropTypes } from 'prop-types';
import color from '@styles/color';

const BackgroundDim = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContainer = styled.div`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  background: ${color.white};
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
`;

const Modal = ({ children, width, height, isVisible, onClose, ...props }) => {
  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  });
  return ReactDom.createPortal(
    <BackgroundDim isVisible={isVisible}>
      <ModalContainer width={width} height={height} {...props}>
        {children}
      </ModalContainer>
    </BackgroundDim>,
    el,
  );
};

Modal.defaultProps = {
  width: '70%',
  height: 'auto',
  isVisible: false,
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isVisible: PropTypes.bool,
  onClose: PropTypes.string.isRequired,
};

export default Modal;
