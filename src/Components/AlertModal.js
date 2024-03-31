import React from 'react';
import { Modal } from 'antd';

const AlertModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default AlertModal;