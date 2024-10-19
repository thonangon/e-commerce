import React from 'react';
import { Modal, Button, HStack, IconButton, Text, Divider, Image } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomModal = ({ isOpen, onClose, title, bodyContent, footerContent }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content
        maxWidth="100%"
        height="50%" // Bottom-half modal
        marginBottom={0}
        position="absolute"
        bottom="0"
        borderTopRadius="20"
      >
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{bodyContent}</Modal.Body>
        <Modal.Footer>{footerContent}</Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CustomModal;
