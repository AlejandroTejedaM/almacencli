import React from 'react';

export function HeadComponentVenta() {
    return (
        <div className="header" style={styles.container}>
            <header className="header">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="d-flex justify-content-center align-items-center" style={styles.navContainer}>
                        <a href="/" className="navbar-brand">Autos</a>
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
