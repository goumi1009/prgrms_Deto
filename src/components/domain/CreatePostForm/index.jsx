import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import CategoryButtons from '@components/domain/CategoryButtons';
import Input from '@components/base/Input';
import Textarea from '@components/base/Textarea';
import ToggleButton from '@components/base/ToggleButton';
import TextButton from '@components/base/TextButton';
import Alert from '@components/base/Alert';
import Modal from '@components/base/Modal';
import IconCheckForm from '@components/domain/IconCheckForm';
import Uploader from '@components/base/Uploader';
import color from '@styles/color';
import { sendPost } from '@utils/api';
import { useAuthContext } from '@contexts/AuthProvider';
import java from '@assets/icon/java.svg';
import javascript from '@assets/icon/javascript.svg';
import nodedotjs from '@assets/icon/nodedotjs.svg';
import python from '@assets/icon/python.svg';
import react from '@assets/icon/react.svg';
import typescript from '@assets/icon/typescript.svg';
import vuedotjs from '@assets/icon/vuedotjs.svg';
import Icon from '@components/base/Icon';
import Text from '@components/base/Text/index';

const categoryList = ['재미', '커뮤니티', '라이프', '교육', '개발', '기타'];
const iconList = [
  { src: java, name: 'Java' },
  { src: javascript, name: 'JavaScript' },
  { src: nodedotjs, name: 'Node.js' },
  { src: python, name: 'Python' },
  { src: typescript, name: 'TypeScript' },
  { src: react, name: 'react' },
  { src: vuedotjs, name: 'Vue' },
];

const FormContainer = styled.div``;

const FileContainer = styled.div`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  border: 2px dashed ${color.border};
  border-radius: 8px;
  border-color: ${(props) => (props.dragging ? color.green : color.border)};
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: auto;
    height: 100%;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FormRow = styled.div`
  margin-bottom: 16px;
`;

const AgreeToggleButton = styled(ToggleButton)`
  display: flex;
  align-items: center;
  margin-left: auto;
  justify-content: center;
  border-radius: 4px;
  width: 200px;
`;

const CreatePostForm = () => {
  const [values, setValues] = useState({
    postCategory: [],
    postTitle: '',
    postDescription: '',
    postTechStack: [],
    postDeployLink: '',
    postGithubLink: '',
    postFile: null,
    postCollabo: false,
  });
  const [stackVisible, setStackVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const { userToken } = useAuthContext();
  const history = useHistory();

  const handleCategory = ({ selected, name }) => {
    if (selected) {
      setValues({ ...values, postCategory: [...values.postCategory, name] });
    } else {
      setValues({
        ...values,
        postCategory: values.postCategory.filter(
          (category) => category !== name,
        ),
      });
    }
  };

  const handleTechStack = (selected) => {
    setValues({
      ...values,
      postTechStack: [...values.postTechStack, ...selected],
    });
  };

  const handleCollabo = ({ selected }) => {
    setValues({ ...values, postCollabo: selected });
  };

  const handleChange = ({ value, name }) => {
    setValues({ ...values, [name]: value });
  };

  const handleStackModal = () => {
    setStackVisible(!stackVisible);
  };

  const handleAlertModal = () => {
    setAlertVisible(!alertVisible);
  };

  const handleFiles = (files) => {
    setValues({ ...values, postFile: files });
  };

  const submitForm = async () => {
    await sendPost(userToken, values);
    history.push('/');
  };

  const createFileContainer = (files, dragging, width, height) => (
    <FileContainer dragging={dragging} width={width} height={height}>
      {files.length ? (
        React.Children.toArray(
          Array.from(files).map((file) => (
            <img alt={file.name} src={`${file}`} />
          )),
        )
      ) : (
        <EmptyContainer>
          <Icon name="upload" size={66} />
          <Text content="프로젝트 이미지를 추가하세요" color="secondary" />
        </EmptyContainer>
      )}
    </FileContainer>
  );

  return (
    <FormContainer>
      <CategoryButtons categoryList={categoryList} onToggle={handleCategory} />
      <FormRow>
        <Input
          inputType="text"
          inputId="postTitle"
          inputName="postTitle"
          labelText="제목*"
          labelFontType="small"
          onChange={handleChange}
        />
      </FormRow>
      <FormRow>
        <Textarea
          labelText="설명*"
          labelFontType="small"
          textareaId="postDescription"
          textareaName="postDescription"
          onChange={handleChange}
        />
      </FormRow>
      <FormRow>
        <TextButton
          name="techStackButton"
          textProps={{ content: '사용된 기술 스택', color: 'white' }}
          width={180}
          color="tertiary"
          onClick={handleStackModal}
        />
      </FormRow>
      <Modal isVisible={stackVisible} height={300}>
        <IconCheckForm
          iconList={iconList}
          onToggle={handleTechStack}
          onClose={handleStackModal}
        />
      </Modal>
      <FormRow>
        <Input
          inputType="url"
          inputId="postDeployLink"
          inputName="postDeployLink"
          labelText="배포 주소*"
          labelFontType="small"
          onChange={handleChange}
        />
      </FormRow>
      <FormRow>
        <Input
          inputType="url"
          inputId="postGithubLink"
          inputName="postGithubLink"
          labelText="소스코드 주소"
          labelFontType="small"
          onChange={handleChange}
        />
      </FormRow>
      <FormRow>
        <Uploader
          droppable
          name="postFiles"
          accept="image/*"
          multiple
          width="auto"
          height={120}
          onChange={handleFiles}
        >
          {createFileContainer}
        </Uploader>
      </FormRow>
      <FormRow>
        <AgreeToggleButton
          name="collaboButton"
          text="협업 제안 허용하기"
          baseColor={color.secondary}
          toggleColor={color.greenLight}
          onToggle={handleCollabo}
        />
      </FormRow>
      <TextButton
        name="submitButton"
        textProps={{ content: '완료', color: 'white' }}
        width="100%"
        color="gradient"
        onClick={handleAlertModal}
      />
      <Modal isVisible={alertVisible} width="80%" height="200px;">
        <Alert
          textProps={{ content: '작성을 완료하시겠습니까?', fontType: 'large' }}
          buttons={[
            {
              textProps: { content: '확인', color: 'white' },
              name: 'submitButton',
              hoverColor: 'greenLight',
              onClick: submitForm,
            },
            {
              textProps: { content: '취소' },
              name: 'cancelButton',
              color: 'border',
              hoverColor: 'tertiary',
              onClick: handleAlertModal,
            },
          ]}
        />
      </Modal>
    </FormContainer>
  );
};

export default CreatePostForm;
