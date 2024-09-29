import { Box, Image, Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import icon_logout from '@/assets/img/icon_logout.svg';
import modal_check from '@/assets/img/modal_check.png';

type CustomTempModalProps = {
  text?: string;
  isOpen: boolean;
  onClose: () => void;
  logout?: boolean;
  onClick?: () => void;
};

const CustomTempModal = ({ isOpen, onClose, text, logout, onClick }: CustomTempModalProps) => {
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
            padding: '39px 18px 18px 18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 17,
            gap: 17,
          }}
        >
          {!logout && (
            <Image
              src={modal_check}
              sx={{
                width: '48px',
              }}
            />
          )}
          {logout && (
            <Box
              sx={{
                width: '66px',
                height: '66px',
                background: '#3F3F3F',
                padding: '18px 12px 18px 18px',
                borderRadius: '999px',
              }}
            >
              <Image src={icon_logout} sx={{ width: '36.12px', height: '30px' }} />
            </Box>
          )}
          <Box sx={{ textAlign: 'center', marginBottom: '27px' }}>
            <Text sx={{ color: '#fff', fontSize: 16, fontWeight: '500', lineHeight: '21px' }}>
              {!logout ? text : '정말 로그아웃하시겠습니까?'}
            </Text>
            {logout && (
              <Text
                sx={{
                  width: '100%',
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: '#b8b8b8',
                }}
              >
                다시 로그인하려면 계정 정보를 입력해야합니다.
              </Text>
            )}
          </Box>
          {logout && (
            <Box sx={{ display: 'flex', gap: '17px', width: '100%', marginTop: 'auto' }}>
              <Box
                sx={{
                  flex: 1,
                  padding: '18px 0',
                  borderRadius: '15px',
                  backgroundColor: '#3c3c3c',
                  textAlign: 'center',
                }}
                onClick={onClose}
              >
                <Text
                  sx={{ fontSize: '12px', fontWeight: '500', lineHeight: '14.32px', color: '#fff' }}
                >
                  취소
                </Text>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  padding: '18px 0',
                  borderRadius: '15px',
                  backgroundColor: '#ff6d6d',
                  textAlign: 'center',
                }}
                onClick={onClick}
              >
                <Text
                  sx={{ fontSize: '12px', fontWeight: '600', lineHeight: '14.32px', color: '#000' }}
                >
                  로그아웃
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default CustomTempModal;
