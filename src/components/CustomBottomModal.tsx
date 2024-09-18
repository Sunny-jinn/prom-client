import { useEffect } from 'react';
import { Box, Image, Modal, ModalContent, Text } from '@chakra-ui/react';
import modal_delete from '@/assets/img/delete.png';
import modal_eye_off from '@/assets/img/icon_eye_off.png';
import modal_check from '@/assets/img/modal_check.png';

type CustomBottomModalProps = {
  text: string;
  content: string;
  icon?: 'modal_check' | 'modal_delete' | 'modal_eye_off';
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
};

const icons: { [key: string]: string } = {
  modal_check,
  modal_delete,
  modal_eye_off,
};

const CustomBottomModal = ({
  icon,
  isOpen,
  onClose,
  content,
  text,
  duration = 2000,
}: CustomBottomModalProps) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      // Clear the timer if the modal is closed before the duration expires
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        sx={{
          position: 'absolute',
          background: 'none',
          bottom: '50px',
          margin: '0',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#000',
            border: '1px solid #7bf7ff',
            borderRadius: 10,
            padding: '15.5px 25px',
            margin: '0 16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {icon && (
            <Image
              src={icons[icon]}
              sx={{
                width: '25px',
              }}
            />
          )}
          <Box>
            <Text
              sx={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '600',
                lineHeight: '14.32px',
              }}
            >
              {text}
            </Text>
            <Text
              sx={{
                color: '#a6a6a6',
                fontSize: 12,
                lineHeight: '14.32px',
              }}
            >
              {content}
            </Text>
          </Box>
          <Text
            sx={{
              color: '#fff',
              fontSize: 12,
              marginLeft: 'auto',
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            취소
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default CustomBottomModal;
