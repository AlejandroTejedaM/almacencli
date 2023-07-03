import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HeadComponentAutorizacionPago} from "./Components/AutorizacionPagoComponents/HeadComponentAutorizacionPago";
import {FootComponentAutorizacionPago} from "./Components/AutorizacionPagoComponents/FootComponentAutorizacionPago";
import FormularioAutorizacionPagoComponent
    from "./Components/AutorizacionPagoComponents/FormularioAutorizacionPagoComponent";
import ListaAutorizacionPagoComponent from "./Components/AutorizacionPagoComponents/ListaAutorizacionPagoComponent";

function App() {
    return (<div className="App">
        <BrowserRouter>
            <HeadComponentAutorizacionPago/>
            <div className='container'>
                <Routes>
                    <Route path='/autorizacionPago' element={<ListaAutorizacionPagoComponent/>}/>
                    <Route></Route>
                </Routes>

            </div>
            <FootComponentAutorizacionPago/>
        </BrowserRouter>
    </div>);
}

export default App;
