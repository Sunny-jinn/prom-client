import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/style/reset';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { ChakraProvider } from '@chakra-ui/react';

dayjs.locale('ko');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
