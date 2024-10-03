import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import RootRouter from '@/RootRouter';
import { reset } from '@/style/reset';

function App() {
  return (
    <BrowserRouter>
      <Global styles={reset} />
      <RootRouter />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
