import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HeadComponent} from "./Components/HeadComponent";
import ListaAutorizacionPagoComponent from "./Components/AutorizacionPagoComponents/ListaAutorizacionPagoComponent";
import ListaVentaComponent from "./Components/VentaComponents/ListaVentaComponent";
import ListaProductoComponent from "./Components/ProductoComponents/ListaProductoComponent";
import ListaCarritoComponent from "./Components/CarritoCompraComponents/ListaCarritoComponent";
import ListaCajeroComponent from "./Components/CajeroComponents/ListaCajerosComponent";
import FormularioCajeroComponent from "./Components/CajeroComponents/FormularioCajeroComponent";
import FormularioProductoComponent from "./Components/ProductoComponents/FormularioProductoComponent";
import FootComponent from "./Components/FootComponent";


function App() {
    return (<div className="App">
        <BrowserRouter>
            <HeadComponent/>
            <div className='container'>
                <Routes>
                    <Route path='/autorizacionPago' element={<ListaAutorizacionPagoComponent/>}/>
                    <Route path='/venta' element={<ListaVentaComponent/>}/>
                    <Route path='/lista-productos' element={<ListaProductoComponent/>}></Route>
                    <Route path='/carrito' element={<ListaCarritoComponent/>}></Route>
                    <Route path='/cajeros' element={<ListaCajeroComponent/>}></Route>
                    <Route path='/form-cajero' element={<FormularioCajeroComponent/>}></Route>
                    <Route path='/edit-cajero/:cajeroId' element={<FormularioCajeroComponent/>}></Route>
                    <Route path='/edit-producto/:productoId' element={<FormularioProductoComponent/>}></Route>
                </Routes>
            </div>
            <FootComponent/>
        </BrowserRouter>
    </div>);
}

export default App;
