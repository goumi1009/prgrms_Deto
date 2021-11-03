import { useCallback, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import color from '@styles/color';
import TextButton from '@components/base/TextButton';
import Textarea from '@components/base/Textarea';
import Text from '@components/base/Text';

const CommentWrapper = styled.div`
  position: relative;
  textarea {
    width: 100%;
    height: 100px;
    padding: 16px;
    margin-bottom: 8px;
    border-radius: 4px;
    &:focus {
      border-color: ${color.green};
    }
  }
`;

const RodioWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  label {
    margin-left: 8px;
  }

  input {
    margin-right: 4px;
  }
`;
const TextButtonRight = styled(TextButton)`
  margin-left: auto;
`;

const radioOptions = [
  {
    label: '칭찬',
    value: 'praise',
  },
  {
    label: '훈수',
    value: 'advice',
  },
  {
    label: '질문',
    value: 'question',
  },
  {
    label: '잡담',
    value: 'chat',
  },
];

const CommentForm = ({ onSubmit }) => {
  const [textValue, setTextValue] = useState('');
  const [typeValue, setTypeValue] = useState('');

  const handleInputChange = useCallback(
    (key, value) => {
      if (key === 'type') {
        setTypeValue(value);
      } else {
        setTextValue(value);
      }
    },
    [textValue, typeValue],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const sendValue = { type: typeValue, text: textValue };
      setTextValue('');
      onSubmit(sendValue);
    },
    [typeValue, textValue],
  );

  return (
    <CommentWrapper>
      <RodioWrapper>
        {radioOptions.map((item) => (
          <label htmlFor={item.value} key={item.value}>
            <input
              id={item.value}
              name="commentType"
              value={item.label}
              onChange={(e) => handleInputChange('type', e.target.value)}
              type="radio"
            />
            <Text content={item.label} />
          </label>
        ))}
      </RodioWrapper>
      <Textarea
        labelText="댓글"
        labelFontType="large"
        value={textValue}
        onChange={(e) => handleInputChange('text', e.value)}
      />
      <TextButtonRight
        textProps={{
          content: '댓글 작성',
          color: 'white',
          strong: true,
          fontType: 'small',
        }}
        onClick={handleSubmit}
      />
    </CommentWrapper>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
