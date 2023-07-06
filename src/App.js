import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FootComponent from './Components/FootComponent';
import HeadComponent from './Components/HeadComponent';
import ListaCajeroComponent from './Components/ListaCajerosComponent';
import FormularioCajeroComponent from './Components/FormularioCajeroComponent';


function App(){
  return(
    <div>
      <BrowserRouter>
      <HeadComponent/>
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<ListaCajeroComponent />}></Route>
          <Route path='/cajeros' element={<ListaCajeroComponent/>}></Route>
          <Route path='/form-cajero' element={<FormularioCajeroComponent/>}></Route>
          <Route path='/edit-cajero/:cajeroId' element = {<FormularioCajeroComponent/>}></Route>
        </Routes>
      </div>
      <FootComponent/>
      </BrowserRouter>
    </div>
  )
}


export default App;
