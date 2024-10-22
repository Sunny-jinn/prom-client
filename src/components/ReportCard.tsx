import { Box, Image, Text } from '@chakra-ui/react';
import icon_up_arrow from '@/assets/img/icon_up_arrow.png';

type ReportCardProp = {
  text: string;
  onClick?: () => void;
};

const ReportCard = ({ text, onClick }: ReportCardProp) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '19px 0',
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Text sx={{ color: '#fff' }}>{text}</Text>
        <Image
          src={icon_up_arrow}
          alt=">"
          sx={{
            transform: 'rotate(90deg)',
            marginLeft: 'auto',
            width: '25px',
            height: '25px',
          }}
        />
      </Box>
    </Box>
  );
};

export default ReportCard;
