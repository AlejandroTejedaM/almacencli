import React from 'react';

export function HeadComponent() {
    return (
        <div className="header" style={styles.container}>
            <header className="header">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="d-flex justify-content-center align-items-center" style={styles.navContainer}>
                        <a href="/lista-productos" className="navbar-brand">Productos</a>
                        <a href="/carrito" className="navbar-brand">Carrito</a>
                        <a href="/venta" className="navbar-brand">Ventas</a>
                        <a href="/autorizacionPago" className="navbar-brand">Autorizaciones_pago</a>
                        <a href="/cajeros" className="navbar-brand">Cajeros</a>
                        <a href="/tipoCerveza" className="navbar-brand">Tipo_Cerveza</a>
                    </div>
                </nav>
            </header>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    navContainer: {
        maxWidth: '800px',
    },
};
