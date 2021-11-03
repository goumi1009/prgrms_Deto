import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import IconToggle from '@components/base/IconToggle';
import TextButton from '@components/base/TextButton';
import java from '@assets/icon/java.svg';
import javascript from '@assets/icon/javascript.svg';
import nodedotjs from '@assets/icon/nodedotjs.svg';
import python from '@assets/icon/python.svg';
import react from '@assets/icon/react.svg';
import typescript from '@assets/icon/typescript.svg';
import vuedotjs from '@assets/icon/vuedotjs.svg';

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-around;
  margin-bottom: 24px;
`;

const IconCheckForm = ({
  iconList = [
    { src: java, name: 'Java' },
    { src: javascript, name: 'JavaScript' },
    { src: nodedotjs, name: 'Node.js' },
    { src: python, name: 'Python' },
    { src: typescript, name: 'TypeScript' },
    { src: react, name: 'react' },
    { src: vuedotjs, name: 'Vue' },
  ],
  onToggle,
  onClose,
}) => {
  const [values, setValues] = useState([]);

  const handleStack = ({ selected, name }) => {
    if (selected) {
      setValues([...values, name]);
    } else {
      setValues(values.filter((stack) => stack !== name));
    }
  };

  const handleSubmit = () => {
    onToggle(values);
    onClose();
  };

  return (
    <IconContainer>
      <IconWrapper>
        {iconList.map((icon) => (
          <IconToggle
            key={icon.name}
            name={icon.name}
            onToggle={handleStack}
            src={icon.src}
          />
        ))}
      </IconWrapper>
      <TextButton
        textProps={{ content: '선택 완료', color: 'white' }}
        name="완료"
        width="100%"
        height={40}
        hoverColor="green"
        onClick={handleSubmit}
      />
    </IconContainer>
  );
};

IconCheckForm.propTypes = {
  iconList: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IconCheckForm;
