import Modal from '@components/base/Modal';
import { useState } from 'react';

export default {
  title: 'Component/Modal',
  component: Modal,
  argTypes: {
    width: {
      control: { type: 'range', min: 0, max: 600 },
    },
    height: {
      control: { type: 'range', min: 0, max: 600 },
    },
  },
};

export const Default = (args) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsVisible(true)}>
        모달열기
      </button>
      <Modal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        {...args}
      >
        <button type="button" onClick={() => setIsVisible(false)}>
          닫기
        </button>
        Hello!!!
      </Modal>
    </div>
  );
};
