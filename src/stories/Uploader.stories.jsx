/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Uploader from '@components/base/Uploader';

export default {
  title: 'Component/Uploader',
  component: Uploader,
};

const res = [];

export const Default = (args) => (
  <Uploader
    {...args}
    name="uploader"
    onChange={(src) => console.log([...res, src])}
    droppable
  >
    {(files, dragging) => (
      <div
        style={{
          width: 300,
          height: 100,
          border: '2px dashed red',
          borderColor: dragging ? 'black' : 'red',
        }}
      >
        {files.length
          ? React.Children.toArray(
              Array.from(files).map((el) => (
                <img style={{ width: 100, height: 100 }} src={`${el}`} />
              )),
            )
          : '이미지 또는 gif를 드래그 하세요'}
      </div>
    )}
  </Uploader>
);
