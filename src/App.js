import { Route, Routes } from 'react-router-dom';
import {Main} from './pages/Main.view'
import './App.css';
import { Cotizador } from './pages/Cotizador.page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/compra' element={<Cotizador />} />
      {/* <Route path={} element={} /> */}
    </Routes>
  );
}

export default App;
