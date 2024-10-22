import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import App from '@/App';
import '@/style/reset';

dayjs.locale('ko');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
);
