import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HeadComponentAutorizacionPago} from "./Components/AutorizacionPagoComponents/HeadComponentAutorizacionPago";
import {FootComponentAutorizacionPago} from "./Components/AutorizacionPagoComponents/FootComponentAutorizacionPago";
import ListaAutorizacionPagoComponent from "./Components/AutorizacionPagoComponents/ListaAutorizacionPagoComponent";
import ListaVentaComponent from "./Components/VentaComponents/ListaVentaComponent";

function App() {
    return (<div className="App">
        <BrowserRouter>
            <HeadComponentAutorizacionPago/>
            <div className='container'>
                <Routes>
                    <Route path='/autorizacionPago' element={<ListaAutorizacionPagoComponent/>}/>
                    <Route path='/venta' element={<ListaVentaComponent/>}/>
                </Routes>
            </div>
            <FootComponentAutorizacionPago/>
        </BrowserRouter>
    </div>);
}

export default App;
