import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import RootRouter from '@/RootRouter';
import { reset } from '@/style/reset';

function App() {
  return (
    <BrowserRouter>
      <Global styles={reset} />
      <RootRouter />
    </BrowserRouter>
  );
}

export default App;
