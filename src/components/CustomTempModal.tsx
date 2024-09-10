import { Box, Image, Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import modal_check from '@/assets/img/modal_check.png';

type CustomTempModalProps = {
  text: string;
  isOpen: boolean;
  onClose: () => void;
};

const CustomTempModal = ({ isOpen, onClose, text }: CustomTempModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        sx={{
          background: 'none',
          margin: '0 16px',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#484848',
            padding: '43px 66px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 17,
            gap: 17,
          }}
        >
          <Image
            src={modal_check}
            sx={{
              width: '48px',
            }}
          />
          <Text sx={{ color: '#fff', fontSize: 14 }}>{text}</Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default CustomTempModal;
