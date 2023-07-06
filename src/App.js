import './App.css';
import HeadComponent from './Componentes/headComponents';
import FootComponent from './Componentes/footComponent';
import listaTipoChelasComponent from './components/listaTipoChelasComponents';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormulariotipoChelasComponent from './Componentes/FormulariotipoChelasComponent';


function App() {
return(
  <div>
    <BrowserRouter>
      <HeadComponent />
      <div className='container'>
      <Routes>
        <Route exact path='/' element={<listaTipoChelasComponent />}></Route>
        <Route path='/productos' element={<listaTipoChelasComponent />}></Route>
        <Route path='/form-producto' element={<FormulariotipoChelasComponent/>}></Route>
        <Route path='edit-producto/:idProducto' element={<FormulariotipoChelasComponent/>}></Route>
      </Routes>
      </div>
      <FootComponent />
      </BrowserRouter>
  </div>
);
}
export default App;
