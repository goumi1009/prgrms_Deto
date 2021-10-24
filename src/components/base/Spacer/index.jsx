import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSpacer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.type === 'vertical' ? 'column' : 'row')};
`;

const Spacer = ({ children, type, size }) => {
  const nodes = React.Children.toArray(children)
    .filter((element) => React.isValidElement(element))
    .map((element, index, elements) =>
      React.cloneElement(element, {
        style: {
          marginRight:
            type === 'horizontal' && index !== elements.length - 1
              ? size
              : undefined,
          marginBottom:
            type === 'vertical' && index !== elements.length - 1
              ? size
              : undefined,
        },
      }),
    );

  return <StyledSpacer type={type}>{nodes}</StyledSpacer>;
};

Spacer.defaultProps = {
  type: 'vertical',
  size: 8,
};

Spacer.propTypes = {
  children: PropTypes.element.isRequired,
  type: PropTypes.string,
  size: PropTypes.number,
};

export default Spacer;
