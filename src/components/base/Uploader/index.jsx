import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const UploadContainer = styled.div`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  border-radius: 4px;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const Uploader = ({
  children,
  droppable,
  name,
  accept,
  multiple,
  onChange,
  width,
  height,
  ...props
}) => {
  const [uploads, setUploads] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const { files } = e.target;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUploads((prevState) => [...prevState, reader.result]);
      };
    });
    onChange(files);
  };

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  const handleDragEnter = (e) => {
    if (!droppable) return;

    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragLeave = (e) => {
    if (!droppable) return;

    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  };
  const handleDragOver = (e) => {
    if (!droppable) return;

    e.preventDefault();
    e.stopPropagation();
  };
  const handleFileDrop = (e) => {
    if (!droppable) return;

    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUploads((prevState) => [...prevState, reader.result]);
      };
    });
  };

  return (
    <UploadContainer
      onClick={handleChooseFile}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      {...props}
    >
      <Input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        multiple={false}
        onChange={handleFileChange}
      />
      {typeof children === 'function'
        ? children(uploads, dragging, width, height)
        : children}
    </UploadContainer>
  );
};

Uploader.defaultProps = {
  droppable: true,
  accept: '',
  multiple: true,
  width: 264,
  height: 100,
};

Uploader.propTypes = {
  children: PropTypes.func.isRequired,
  droppable: PropTypes.bool,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Uploader;
