import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/on-boarding' element={<div></div>} />
      <Route path='/sign-in' element={<div></div>} />
      <Route path='/sign-up' element={<div></div>} />
    </Routes>
  )
}

export default App;
