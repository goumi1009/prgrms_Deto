import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryButtons from '@components/domain/CategoryButtons';
import Input from '@components/base/Input';
import Textarea from '@components/base/Textarea';
import ToggleButton from '@components/base/ToggleButton';
import TextButton from '@components/base/TextButton';
import Alert from '@components/base/Alert';
import Modal from '@components/base/Modal';
import Uploader from '@components/base/Uploader';
import color from '@styles/color';
import { sendPost } from '@utils/api';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileContainer = styled.div`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  border: 2px dashed ${color.border};
  border-color: ${(props) => (props.dragging ? color.green : color.border)};
`;

const categoryList = ['재미', '커뮤니티', '라이프', '교육', '개발', '기타'];

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

  // state 확인을 위한 임시 console
  console.log('현재 state: ', values);

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
    // 완료 클릭하면,
    // 유저 정보 페이지로 redirect
    await sendPost(values);
  };

  const createFileContainer = (files, dragging, width, height) => (
    <FileContainer dragging={dragging} width={width} height={height}>
      {files.length
        ? React.Children.toArray(
            Array.from(files).map((file) => (
              <img alt={file.name} style={{ width, height }} src={`${file}`} />
            )),
          )
        : '프로젝트 이미지를 추가하세요'}
    </FileContainer>
  );

  return (
    <FormContainer>
      <CategoryButtons categoryList={categoryList} onToggle={handleCategory} />
      <Input
        inputType="text"
        inputId="postTitle"
        inputName="postTitle"
        labelText="제목*"
        labelFontType="micro"
        onChange={handleChange}
      />
      <Textarea
        labelText="설명*"
        labelFontType="micro"
        textareaId="postDescription"
        textareaName="postDescription"
        onChange={handleChange}
      />
      <TextButton
        textProps={{ content: '사용된 기술 스택' }}
        size={264}
        color="border"
        onClick={handleStackModal}
      />
      <Modal isVisible={stackVisible}>
        <>기술 스택 리스트 들어갈 자리</>
      </Modal>
      <Input
        inputType="url"
        inputId="postDeployLink"
        inputName="postDeployLink"
        labelText="배포 주소*"
        labelFontType="micro"
        onChange={handleChange}
      />
      <Input
        inputType="url"
        inputId="postGithubLink"
        inputName="postGithubLink"
        labelText="소스코드 주소"
        labelFontType="micro"
        onChange={handleChange}
      />
      <Uploader
        droppable
        name="postFiles"
        accept="image/*"
        multiple
        onChange={handleFiles}
      >
        {createFileContainer}
      </Uploader>
      <ToggleButton
        text="협업 제안 허용하기"
        size={264}
        toggleColor={color.green}
        onToggle={handleCollabo}
      />
      <TextButton
        textProps={{ content: '완료' }}
        size={264}
        color="tertiary"
        onClick={handleAlertModal}
      />
      <Modal isVisible={alertVisible}>
        <Alert
          textProps={{ content: '작성을 완료하시겠습니까?' }}
          buttons={[
            {
              textProps: { content: '확인' },
              name: 'submitButton',
              onClick: submitForm,
            },
            {
              textProps: { content: '취소' },
              name: 'cancelButton',
              onClick: handleAlertModal,
            },
          ]}
        />
      </Modal>
    </FormContainer>
  );
};

export default CreatePostForm;
