import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import IconToggle from '@components/base/IconToggle';
import TextButton from '@components/base/TextButton';

const IconContainer = styled.div`
  width: 400px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const IconCheckForm = ({
  iconList = [
    { src: 'https://picsum.photos/200?1', name: 'Vue' },
    { src: 'https://picsum.photos/200?2', name: 'React' },
    { src: 'https://picsum.photos/200?3', name: 'Java' },
    { src: 'https://picsum.photos/200?4', name: 'JavaScript' },
    { src: 'https://picsum.photos/200?5', name: 'Node.js' },
    { src: 'https://picsum.photos/200?6', name: 'TypeScript' },
    { src: 'https://picsum.photos/200?7', name: 'Python' },
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
        textProps={{ content: '선택 완료' }}
        name="완료"
        size={400}
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
